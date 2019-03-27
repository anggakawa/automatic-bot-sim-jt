const db = require('../config/db.js');

// initial sql statements

const INSERT_DATA = `INSERT INTO subscriber (telegram_id) VALUES (?)`;
const DELETE_DATA = `DELETE FROM subscriber WHERE telegram_id = ?`;
const SELECT_ALL_DATA = `SELECT telegram_id FROM subscriber`;

const subscriber = {
  async addSubscriber(telegram_id){
    db.run(INSERT_DATA, [telegram_id], (err) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log('id anda telah menjadi subscriber');
    });
  },
  async unsubscribe(telegram_id) {
    // console.log(telegram_id);
    db.run(DELETE_DATA, [telegram_id], (err) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log('id anda telah dihapus');
    });
  },
  getAllSubscriber() {
    return new Promise((resolve, reject) => {
      db.all(SELECT_ALL_DATA, [], (err, result) => {
        if (err) {
          return console.error(err.message);
        }
        resolve(result);
      });
    })
    
  }
}

module.exports = subscriber;