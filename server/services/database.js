const mongoose = require('mongoose');
const config = require('../config');

const { database } = config;

/**
 * Connect to database
 */
const connect = () => {
  mongoose.connect(database.url, { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log('Database connection error:', err);
    }
  });

  mongoose.connection.on('open', () => {
    console.log(`Database => ${database.url} \x1b[32m%s\x1b[0m`, 'connected');
  });
};

/**
 * Disconnect to database
 */
const disconnect = () => {
  mongoose.connection.close();
};

module.exports = {
  connect,
  disconnect,
};
