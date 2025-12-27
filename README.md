# Timesheet Tracker

A Persian calendar timesheet tracking application built with React and Vite. Track your work hours, calculate salary, and manage paid leave - all stored locally in your browser.

## Features

- 📅 Persian calendar support
- ⏰ Time tracking with check-in/check-out
- 💰 Automatic salary calculation
- 📊 Summary of work hours and earnings
- 🏖️ Paid leave tracking
- 📱 Responsive design (PWA-ready)
- 💾 Local storage - all data saved in your browser
- 🌙 Thursday weekend configuration option

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

1. **First Time Setup**: Configure your monthly salary, required work hours, and paid leave hours
2. **Select Month**: Use the month selector to navigate to different months
3. **Enter Times**: Click on each day to enter check-in and check-out times
4. **Mark Status**: Use buttons to mark days as "Not Going" or "Holiday"
5. **Track Leave**: Enter your paid leave hours used
6. **View Summary**: See your total work hours and calculated salary at the top

## Configuration

- **Monthly Salary**: Your total monthly salary
- **Required Hours**: Minimum hours required per month
- **Paid Leave Hours**: Total paid leave hours available
- **Thursday as Weekend**: Toggle if Thursday is a weekend in your area

## Data Storage

All data is stored locally in your browser's localStorage. This means:
- ✅ No server required
- ✅ Works offline
- ✅ Data stays on your device
- ⚠️ Data is browser-specific (won't sync across devices/browsers)
- ⚠️ Clearing browser data will delete your timesheet data

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### GitHub Pages

1. Update `vite.config.js` with your repository name:
```javascript
base: '/your-repo-name/'
```

2. Push to GitHub and enable GitHub Pages in repository settings

3. The app will be available at: `https://yourusername.github.io/your-repo-name/`

### Other Platforms

This is a static site and can be deployed to any static hosting service:
- Netlify
- Vercel
- Cloudflare Pages
- Any web server

## Technologies

- React 19
- Vite
- Material-UI (MUI)
- Day.js
- Jalaali.js (Persian calendar)

## License

MIT
