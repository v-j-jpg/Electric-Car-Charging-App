const winston = require('winston');
require('dotenv').config();
require('winston-mongodb');
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.MongoDB({ // Log to MongoDB
      db: process.env.MONGODB_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      collection: 'logs',
    }),
  ],
});

module.exports = logger;
