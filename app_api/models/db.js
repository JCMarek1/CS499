const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}:27017/travlr`; // Added default port
const readline = require('readline'); // Fixed lowercase 'l'

// Connection with modern options
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  }), 1000);
};

// Connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows termination handler
if (process.platform === 'win32') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.on('SIGINT', () => {
    process.emit("SIGINT");
  });
}

// Graceful shutdown
const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

// Process handlers
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination');
  process.exit(0);
});

process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
  process.exit(0);
});

// Initial connection
connect();

// Schema loading
require('./travlr');

module.exports = mongoose;