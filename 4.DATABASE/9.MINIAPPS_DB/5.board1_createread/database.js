// const sqlite3 = require('sqlite3');
const bettersqlite3 = require('better-sqlite3');

class Database {
    constructor() {
        this.db = new bettersqlite3('board.db');
    }

    execute(query, params = []) {
        try {
            const statement = this.db.prepare(query);
            const result = statement.run(params);
            return { lastID: result.lastInsertRowid, changes: result.changes }
        } catch(error) {
            throw error;
        }
    }

    // 이런식으로, 또 나만의 query = 불러오는 함수도 구현하기
    executeQuery(query, params = []) {
        try {
            const statement = this.db.prepare(query);
            const rows = statement.all(params);
            return rows;
        } catch(error) {
            throw error;
        }
    }

    close() {
        try {
            this.db.close();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Database;
