PRAGMA foreign_keys = ON;

-- =========================
-- 0) Reset
-- =========================
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- =========================
-- 1) Tables
-- =========================
CREATE TABLE users (
  user_id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  email      TEXT    NOT NULL UNIQUE,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  price      INTEGER NOT NULL CHECK(price >= 0), -- KRW 정수 가정
  stock      INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE orders (
  order_id    INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL,
  product_id  INTEGER NOT NULL,
  qty         INTEGER NOT NULL CHECK(qty > 0),
  unit_price  INTEGER NOT NULL CHECK(unit_price >= 0), -- 주문 시점 가격 스냅샷
  total_price INTEGER NOT NULL CHECK(total_price >= 0),
  ordered_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id)    REFERENCES users(user_id)    ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

CREATE INDEX idx_orders_user_id    ON orders(user_id);
CREATE INDEX idx_orders_product_id ON orders(product_id);
CREATE INDEX idx_orders_ordered_at ON orders(ordered_at);

-- =========================
-- 2) Seed Data
-- =========================

-- 2-1) Users (10)
INSERT INTO users (name, email, created_at) VALUES
('Kim Minjun',   'minjun.kim@example.com',   '2025-12-01 09:00:00'),
('Lee Seoyeon',  'seoyeon.lee@example.com', '2025-12-01 09:10:00'),
('Park Jiwon',   'jiwon.park@example.com',  '2025-12-01 09:20:00'),
('Choi Yuna',    'yuna.choi@example.com',   '2025-12-01 09:30:00'),
('Jung Dohyun',  'dohyun.jung@example.com', '2025-12-01 09:40:00'),
('Kang Jiho',    'jiho.kang@example.com',   '2025-12-01 09:50:00'),
('Yoon Sumin',   'sumin.yoon@example.com',  '2025-12-01 10:00:00'),
('Han Jisoo',    'jisoo.han@example.com',   '2025-12-01 10:10:00'),
('Song Hyunwoo', 'hyunwoo.song@example.com','2025-12-01 10:20:00'),
('Lim Hyejin',   'hyejin.lim@example.com',  '2025-12-01 10:30:00');

-- 2-2) Products (5)
INSERT INTO products (name, price, stock, created_at) VALUES
('Notebook',   12000, 100, '2025-12-01 11:00:00'),
('Pen',         1500, 300, '2025-12-01 11:00:00'),
('Mug',         8000,  80, '2025-12-01 11:00:00'),
('Tumbler',    18000,  60, '2025-12-01 11:00:00'),
('Backpack',   45000,  40, '2025-12-01 11:00:00');

-- 2-3) Orders (20)
-- unit_price는 products.price를 그대로 복사해서 "주문 시점 스냅샷"으로 저장
-- total_price = unit_price * qty
INSERT INTO orders (user_id, product_id, qty, unit_price, total_price, ordered_at) VALUES
(1,  1, 1, 12000, 12000, '2025-12-02 09:10:00'),
(2,  2, 3,  1500,  4500, '2025-12-02 09:15:00'),
(3,  5, 1, 45000, 45000, '2025-12-02 09:20:00'),
(4,  3, 2,  8000, 16000, '2025-12-02 09:25:00'),
(5,  4, 1, 18000, 18000, '2025-12-02 09:30:00'),

(6,  2, 5,  1500,  7500, '2025-12-03 10:05:00'),
(7,  1, 2, 12000, 24000, '2025-12-03 10:10:00'),
(8,  3, 1,  8000,  8000, '2025-12-03 10:20:00'),
(9,  4, 2, 18000, 36000, '2025-12-03 10:25:00'),
(10, 5, 1, 45000, 45000, '2025-12-03 10:30:00'),

(1,  2, 2,  1500,  3000, '2025-12-04 12:00:00'),
(2,  1, 1, 12000, 12000, '2025-12-04 12:05:00'),
(3,  3, 3,  8000, 24000, '2025-12-04 12:10:00'),
(4,  4, 1, 18000, 18000, '2025-12-04 12:15:00'),
(5,  5, 2, 45000, 90000, '2025-12-04 12:20:00'),

(6,  1, 1, 12000, 12000, '2025-12-05 15:00:00'),
(7,  5, 1, 45000, 45000, '2025-12-05 15:10:00'),
(8,  2, 4,  1500,  6000, '2025-12-05 15:20:00'),
(9,  3, 2,  8000, 16000, '2025-12-05 15:30:00'),
(10, 4, 1, 18000, 18000, '2025-12-05 15:40:00');
