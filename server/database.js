import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database directory
const dbDir = path.join(__dirname, 'data');
const dbFile = path.join(dbDir, 'database.json');

// Initialize database structure
const initDatabase = () => {
  // Create data directory if it doesn't exist
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Create database file if it doesn't exist
  if (!fs.existsSync(dbFile)) {
    const initialData = {
      users: [],
      userConfigs: [],
      monthData: []
    };
    fs.writeFileSync(dbFile, JSON.stringify(initialData, null, 2));
    console.log('✅ Database file created');
  }
};

// Read database
export const readDB = () => {
  try {
    const data = fs.readFileSync(dbFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [], userConfigs: [], monthData: [] };
  }
};

// Write database
export const writeDB = (data) => {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
    throw error;
  }
};

// Initialize on import
initDatabase();
console.log('✅ Database ready');
