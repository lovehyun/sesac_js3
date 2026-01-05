-- MyCRM SQLite 스키마 초기화 (데이터는 넣지 않습니다)
CREATE TABLE IF NOT EXISTS users (
  Id TEXT,
  Name TEXT,
  Gender TEXT,
  Age INTEGER,
  Birthdate DATETIME,
  Address TEXT
);

CREATE TABLE IF NOT EXISTS stores (
  Id TEXT,
  Name TEXT,
  Type TEXT,
  Address TEXT
);

CREATE TABLE IF NOT EXISTS orders (
  Id TEXT,
  OrderAt DATETIME,
  StoreId TEXT,
  UserId TEXT
);

CREATE TABLE IF NOT EXISTS items (
  Id TEXT,
  Name TEXT,
  Type TEXT,
  UnitPrice INTEGER
);

-- ✅ 올바른 테이블명: order_items
CREATE TABLE IF NOT EXISTS order_items (
  Id TEXT,
  OrderId TEXT,
  ItemId TEXT,
  Qty INTEGER DEFAULT 1
);
