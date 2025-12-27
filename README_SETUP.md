# Setup Guide - JSON File Database

This app uses a **simple JSON file-based database** that requires **NO installation or setup**!

## Quick Start

### Step 1: Install Dependencies

```powershell
# Install frontend dependencies
npm install

# Install backend dependencies
npm --prefix server install
```

### Step 2: Create Environment File (Optional)

Create `server/.env` file (optional - has defaults):

```env
JWT_SECRET=your-random-secret-key-change-this-in-production
PORT=3001
```

### Step 3: Run the Application

**Terminal 1 - Backend:**
```powershell
npm run server:dev
```

You should see:
```
✅ Database file created
✅ Database ready
🚀 Server running on http://localhost:3001
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

## That's It! 🎉

- **No MongoDB setup needed**
- **No cloud database required**
- Database file is automatically created in `server/data/timesheet.db`
- Everything works out of the box!

## Database File

The database is stored in: `server/data/database.json`

This file is automatically created when you first run the server. You can:
- **Backup**: Copy the `database.json` file
- **Reset**: Delete the `database.json` file to start fresh
- **View**: Open in any text editor (it's readable JSON)

## Benefits of JSON Database

✅ **No installation** - works immediately
✅ **No compilation** - pure JavaScript
✅ **No server** - file-based database
✅ **Free** - completely free and open source
✅ **Portable** - database is just a JSON file
✅ **Simple** - easy to understand and debug
✅ **Cross-platform** - works on Windows, Mac, Linux

## Troubleshooting

**"Cannot find module 'better-sqlite3'"**
- Run: `npm --prefix server install`

**"Port already in use"**
- Change PORT in `server/.env` to a different number

**Database file issues**
- Delete `server/data/database.json` to reset the database
- Make sure the `server/data` folder has write permissions

