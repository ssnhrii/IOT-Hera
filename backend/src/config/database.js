import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Database configuration with MySQL and Sequelize
 * Implements Requirements 11.1, 11.2, 11.3
 */
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'hera_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
};

// Create Sequelize instance
export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: dbConfig.logging,
    define: dbConfig.define
  }
);

/**
 * Connect to MySQL database with retry logic
 * Implements Requirements 11.1, 11.2
 * 
 * @param {number} maxRetries - Maximum number of connection retry attempts
 * @param {number} retryDelay - Delay between retry attempts in milliseconds
 * @returns {Promise<void>}
 */
export const connectDatabase = async (maxRetries = 5, retryDelay = 5000) => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      console.log(`Attempting to connect to MySQL... (Attempt ${retries + 1}/${maxRetries})`);
      
      await sequelize.authenticate();
      
      console.log('✓ MySQL connected successfully');
      console.log(`  Database: ${dbConfig.database}`);
      console.log(`  Host: ${dbConfig.host}`);
      console.log(`  Port: ${dbConfig.port}`);
      
      // Sync models in development (creates tables if they don't exist)
      if (process.env.NODE_ENV === 'development') {
        await sequelize.sync({ alter: false });
        console.log('✓ Database models synchronized');
      }
      
      return;
    } catch (error) {
      retries++;
      console.error(`✗ MySQL connection failed (Attempt ${retries}/${maxRetries}):`, error.message);
      
      if (retries >= maxRetries) {
        console.error('✗ Maximum retry attempts reached. Could not connect to MySQL.');
        throw new Error(`Failed to connect to MySQL after ${maxRetries} attempts: ${error.message}`);
      }
      
      console.log(`  Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

/**
 * Disconnect from MySQL gracefully
 * Implements Requirement 11.1
 * 
 * @returns {Promise<void>}
 */
export const disconnectDatabase = async () => {
  try {
    await sequelize.close();
    console.log('✓ MySQL connection closed gracefully');
  } catch (error) {
    console.error('Error closing MySQL connection:', error.message);
    throw error;
  }
};

/**
 * Get current database connection status
 * 
 * @returns {Object} Connection status information
 */
export const getConnectionStatus = () => {
  try {
    // Try to get connection state
    const connectionManager = sequelize.connectionManager;
    const pool = connectionManager.pool;
    
    return {
      connected: pool && pool._allConnections && pool._allConnections.length > 0,
      database: dbConfig.database,
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect
    };
  } catch (error) {
    return {
      connected: false,
      database: dbConfig.database,
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      error: error.message
    };
  }
};

/**
 * Check if database is connected
 * 
 * @returns {Promise<boolean>} True if connected, false otherwise
 */
export const isConnected = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  sequelize,
  connectDatabase,
  disconnectDatabase,
  getConnectionStatus,
  isConnected,
  dbConfig
};
