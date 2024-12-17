const mongoose = require('mongoose');

const initializeDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/fileStorage', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = initializeDatabase;
