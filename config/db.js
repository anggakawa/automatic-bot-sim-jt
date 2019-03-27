const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(__dirname + '/db/subscriber.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('connected to database');
});

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS subscriber 
  (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  telegram_id INTEGER UNIQUE NOT NULL  
  )`;

db.run(CREATE_TABLE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('subscribers table created');
});

module.exports = db;
