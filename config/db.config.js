const { Sequelize } = require('sequelize');
const path = require('path');

// Create a SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    // Sync all models with force option to update schema
    await sequelize.sync({ alter: true });
    console.log('Database synchronized and schema updated');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
