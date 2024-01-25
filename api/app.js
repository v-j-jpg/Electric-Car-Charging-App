require('dotenv').config();
const express = require('express');
const routes = require('./src/routes/index');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const mongodbUri = process.env.MONGODB_URI;
const logger = require('./src/logger/logger');
const PORT = 3001;

if (!mongodbUri || typeof mongodbUri !== 'string') {
  logger.error('Invalid MongoDB URI');
  process.exit(1); // Exit the application if the URI is not valid
}

mongoose.connect(mongodbUri);

const db = mongoose.connection;

db.on('error', (error) => {
  logger.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');

  // Routes/middleware that rely on the database connection
  app.use(express.json());
  app.use('/api', routes);
  app.use(cors());

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
