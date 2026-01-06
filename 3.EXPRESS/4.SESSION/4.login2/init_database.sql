-- sqlite3 users.db < init_database.sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (username, password) VALUES ('user1', 'password1');
INSERT INTO users (username, password) VALUES ('user2', 'password2');
