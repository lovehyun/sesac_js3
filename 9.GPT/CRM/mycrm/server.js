const path = require("path");
const express = require("express");

const { PORT } = require("./config/constants");
const { ensureDatabaseReady } = require("./database/db");
const apiRouter = require("./routes");

const app = express();

// ====== 상수/미들웨어 ======
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API 요청 로그 (디버깅용)
app.use("/api", (req, res, next) => {
  const startedAt = Date.now();
  const nowIso = new Date().toISOString();
  const qs = Object.keys(req.query || {}).length ? ` query=${JSON.stringify(req.query)}` : "";
  console.log(`[${nowIso}] ${req.method} ${req.originalUrl}${qs}`);

  res.on("finish", () => {
    const ms = Date.now() - startedAt;
    console.log(`[${nowIso}] -> ${res.statusCode} (${ms}ms) ${req.method} ${req.originalUrl}`);
  });

  next();
});

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function main() {
  try {
    await ensureDatabaseReady();
  } catch (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  }
}

main();

// ====== listen (파일 맨 마지막) ======
app.listen(PORT, () => {
  console.log(`MyCRM running: http://localhost:${PORT}`);
});
