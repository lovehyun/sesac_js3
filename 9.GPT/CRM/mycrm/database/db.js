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

// 스키마만 보장 (데이터 delete/insert 없음)
function ensureDatabaseReady() {
  return new Promise((resolve, reject) => {
    const sql = fs.readFileSync(INIT_SQL_PATH, "utf-8");
    getDb().exec(sql, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
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

module.exports = { ensureDatabaseReady, all, get };
