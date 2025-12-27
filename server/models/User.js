import { readDB, writeDB } from '../database.js';
import bcrypt from 'bcryptjs';

export class User {
  static create(email, password) {
    const db = readDB();

    // Check if user exists
    if (db.users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = {
      id: Date.now().toString(),
      email: email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    db.users.push(user);
    writeDB(db);

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    };
  }

  static findByEmail(email) {
    const db = readDB();
    return db.users.find(u => u.email === email) || null;
  }

  static findById(id) {
    const db = readDB();
    return db.users.find(u => u.id === id) || null;
  }

  static comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}
