# Quick Start Guide

## Step 1: Set Up MongoDB Connection

Before running the server, you need to set up MongoDB. Choose one:

### Option A: MongoDB Atlas (Cloud - Recommended - Free)

1. Go to https://www.mongodb.com/cloud/atlas and sign up
2. Create a free cluster (M0)
3. Create a database user and get your connection string
4. Update `server/.env` with your connection string

### Option B: Local MongoDB

1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/timesheet-tracker`

## Step 2: Create Environment Files

### Create `server/.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/timesheet-tracker
JWT_SECRET=your-random-secret-key-here
PORT=3001
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### Create `.env` file in root directory:

```env
VITE_API_URL=http://localhost:3001/api
```

## Step 3: Run the Application

You need **TWO terminal windows**:

### Terminal 1 - Backend Server:
```powershell
cd server
npm start
```

You should see:
- `✅ Connected to MongoDB`
- `🚀 Server running on http://localhost:3001`

### Terminal 2 - Frontend:
```powershell
npm run dev
```

You should see:
- `Local: http://localhost:5173/`

## Quick Commands

Install all dependencies:
```powershell
npm run install:all
```

Start backend in development mode (auto-reload):
```powershell
cd server
npm run dev
```

## Troubleshooting

**"Cannot connect to MongoDB"**
- Check your MongoDB connection string in `server/.env`
- Make sure MongoDB is running (if local) or Atlas cluster is active

**"Port already in use"**
- Change PORT in `server/.env` to a different number (e.g., 3002)

**"Module not found"**
- Run `npm install` in both root and server directories

