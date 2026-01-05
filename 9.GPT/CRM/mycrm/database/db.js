const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// 기본 DB 파일 경로 (프로젝트 내부). 사용자가 별도의 DB를 쓰면 이 파일을 교체해서 사용하시면 됩니다.
const DB_PATH = path.join(__dirname, "mycrm.sqlite3");
const INIT_SQL_PATH = path.join(__dirname, "init_db.sql");

let db;

function getDb() {
  if (!db) db = new sqlite3.Database(DB_PATH);
  return db;
}

function exec(sql) {
  return new Promise((resolve, reject) => {
    getDb().exec(sql, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    getDb().run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

// 스키마 보장 + 최소 데모 데이터 시드
async function ensureDatabaseReady() {
  // 1) create table
  const sql = fs.readFileSync(INIT_SQL_PATH, "utf-8");
  await exec(sql);

  // 2) migration: order_items.Qty 추가(이미 있으면 무시)
  try {
    await run("ALTER TABLE order_items ADD COLUMN Qty INTEGER DEFAULT 1");
  } catch (err) {
    // 이미 컬럼이 있으면 무시
    if (!String(err.message || err).toLowerCase().includes("duplicate") &&
        !String(err.message || err).toLowerCase().includes("already exists")) {
      // SQLite는 'duplicate column name' 형태
      if (!String(err.message || err).toLowerCase().includes("duplicate column name")) throw err;
    }
  }

  // 3) seed (테이블이 비어있을 때만)
  const userCnt = await get("SELECT COUNT(*) AS cnt FROM users");
  const storeCnt = await get("SELECT COUNT(*) AS cnt FROM stores");
  const itemCnt = await get("SELECT COUNT(*) AS cnt FROM items");

  if ((userCnt?.cnt ?? 0) === 0) {
    // 1001명 (교육용)
    await exec("BEGIN TRANSACTION");
    try {
      for (let i = 1; i <= 1001; i++) {
        const id = `U${String(i).padStart(4, "0")}`;
        const age = 18 + (i % 43);
        const gender = i % 2 === 0 ? "F" : "M";
        const name = `User ${String(i).padStart(4, "0")}`;
        const birthYear = 2026 - age;
        const birthdate = `${birthYear}-01-01`;
        const address = `Seoul ${((i % 25) + 1)}-gu`;
        await run(
          "INSERT INTO users (Id, Name, Gender, Age, Birthdate, Address) VALUES (?, ?, ?, ?, ?, ?)",
          [id, name, gender, age, birthdate, address]
        );
      }
      await exec("COMMIT");
    } catch (e) {
      await exec("ROLLBACK");
      throw e;
    }
  }

  if ((storeCnt?.cnt ?? 0) === 0) {
    await exec("BEGIN TRANSACTION");
    try {
      const stores = [
        { id: "S001", name: "MyCafe Gangnam", type: "Cafe", address: "Seoul Gangnam-gu" },
        { id: "S002", name: "MyCafe Hongdae", type: "Cafe", address: "Seoul Mapo-gu" },
        { id: "S003", name: "MyCafe Jamsil", type: "Cafe", address: "Seoul Songpa-gu" },
      ];
      for (const s of stores) {
        await run(
          "INSERT INTO stores (Id, Name, Type, Address) VALUES (?, ?, ?, ?)",
          [s.id, s.name, s.type, s.address]
        );
      }
      await exec("COMMIT");
    } catch (e) {
      await exec("ROLLBACK");
      throw e;
    }
  }

  if ((itemCnt?.cnt ?? 0) === 0) {
    await exec("BEGIN TRANSACTION");
    try {
      const items = [
        { id: "I001", name: "Americano", type: "Coffee", price: 4500 },
        { id: "I002", name: "Latte", type: "Coffee", price: 5500 },
        { id: "I003", name: "Vanilla Latte", type: "Coffee", price: 6000 },
        { id: "I004", name: "Cold Brew", type: "Coffee", price: 6500 },
        { id: "I005", name: "Matcha Latte", type: "Tea", price: 6500 },
        { id: "I006", name: "Earl Grey", type: "Tea", price: 5000 },
        { id: "I007", name: "Cheesecake", type: "Dessert", price: 7000 },
        { id: "I008", name: "Croissant", type: "Dessert", price: 3800 },
        { id: "I009", name: "Chocolate Muffin", type: "Dessert", price: 4200 },
        { id: "I010", name: "Bagel", type: "Dessert", price: 3500 },
      ];
      for (const it of items) {
        await run(
          "INSERT INTO items (Id, Name, Type, UnitPrice) VALUES (?, ?, ?, ?)",
          [it.id, it.name, it.type, it.price]
        );
      }
      await exec("COMMIT");
    } catch (e) {
      await exec("ROLLBACK");
      throw e;
    }
  }
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    getDb().all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    getDb().get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

module.exports = { ensureDatabaseReady, all, get, run, exec, getDb };
