# Quick MongoDB Setup - Choose One Option

## Option 1: MongoDB Atlas (Cloud - RECOMMENDED - 5 minutes)

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email (free account)

### Step 2: Create Free Cluster
1. After signup, click "Build a Database"
2. Choose **FREE** (M0) tier
3. Choose a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Click "Create" (takes 1-2 minutes)

### Step 3: Create Database User
1. In the setup wizard, create a username and password
   - **SAVE THESE** - you'll need them!
   - Example: username: `timesheetuser`, password: `YourSecurePassword123`
2. Click "Create Database User"

### Step 4: Allow Network Access
1. Choose "Add My Current IP Address" or
2. Click "Allow Access from Anywhere" (0.0.0.0/0) for development
3. Click "Finish and Close"

### Step 5: Get Connection String
1. Click "Connect" button on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your actual credentials
5. Add database name at the end: `/timesheet-tracker`

**Final connection string example:**
```
mongodb+srv://timesheetuser:YourSecurePassword123@cluster0.xxxxx.mongodb.net/timesheet-tracker?retryWrites=true&w=majority
```

### Step 6: Update server/.env file
Replace the `MONGODB_URI` in `server/.env` with your Atlas connection string:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/timesheet-tracker?retryWrites=true&w=majority
JWT_SECRET=timesheet-tracker-secret-key-change-this-in-production
PORT=3001
```

---

## Option 2: Local MongoDB Installation

### Windows:
1. Download MongoDB: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete" installation
4. Install MongoDB as a Windows Service (check the box)
5. MongoDB will start automatically

### Check if MongoDB is running:
```powershell
# Check MongoDB service
Get-Service -Name MongoDB
```

### Start MongoDB service (if not running):
```powershell
# Start MongoDB service
Start-Service -Name MongoDB
```

### Test connection:
```powershell
# Test MongoDB connection
mongosh
```

If MongoDB is installed and running, your `server/.env` should work:
```env
MONGODB_URI=mongodb://localhost:27017/timesheet-tracker
```

---

## After Setup:

1. Update `server/.env` with your connection string
2. Restart the server:
   ```powershell
   npm run server:dev
   ```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:3001
```

---

## Need Help?

- MongoDB Atlas is **EASIER** and recommended
- Free tier includes 512 MB storage (plenty for development)
- No installation needed
- Works from anywhere

