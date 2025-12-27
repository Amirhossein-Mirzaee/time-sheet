import { readDB, writeDB } from '../database.js';

export class UserConfig {
  static findByUserId(userId) {
    const db = readDB();
    const config = db.userConfigs.find(c => c.userId === userId);
    return config ? config.config : null;
  }

  static upsert(userId, config) {
    const db = readDB();
    const existingIndex = db.userConfigs.findIndex(c => c.userId === userId);

    const configData = {
      userId: userId,
      config: config,
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      db.userConfigs[existingIndex] = configData;
    } else {
      db.userConfigs.push(configData);
    }

    writeDB(db);
  }

  static deleteByUserId(userId) {
    const db = readDB();
    db.userConfigs = db.userConfigs.filter(c => c.userId !== userId);
    writeDB(db);
  }
}
