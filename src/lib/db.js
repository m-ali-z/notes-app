const dbPath = "./db.db";
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(dbPath, (err) => {
  if (err) {
    return console.error(err.message);
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    image TEXT,
    provider TEXT,
    providerId TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    notes TEXT NOT NULL,
    email TEXT NOT NULL
    )`);
});

module.exports = db;
