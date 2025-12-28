import { useState, useMemo, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Stack,
  Paper,
  Fade,
} from "@mui/material";
import MonthSelector from "./components/MonthSelector";
import DayEntry from "./components/DayEntry";
import Summary from "./components/Summary";
import PaidLeaveInput from "./components/PaidLeaveInput";
import Configuration from "./components/Configuration";
import StickySummary from "./components/StickySummary";
import { calculateWorkHours } from "./utils/timeUtils";
import {
  getCurrentPersianDate,
  getFingilishMonthName,
} from "./utils/persianCalendar";
import { fetchMonthData } from "./services/calendarApi";
import {
  loadConfig,
  saveConfig,
  saveMonthData,
  loadMonthData,
  CONFIG_STORAGE_KEY,
} from "./utils/storage";
import {
  DEFAULT_MONTHLY_SALARY,
  DEFAULT_REQUIRED_HOURS,
  DEFAULT_PAID_LEAVE_HOURS,
} from "./utils/salaryUtils";
import { formatCurrency } from "./utils/salaryUtils";

const App = () => {
  const currentDate = getCurrentPersianDate();
  const [config, setConfig] = useState(null);
  const [year, setYear] = useState(currentDate.year);
  const [month, setMonth] = useState(currentDate.month);
  const [monthData, setMonthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeEntries, setTimeEntries] = useState({});
  const [dayStatuses, setDayStatuses] = useState({});
  const [paidLeaveUsed, setPaidLeaveUsed] = useState(0);
  const [showStickySummary, setShowStickySummary] = useState(false);
  const summaryRef = useRef(null);

  // Load configuration on mount
  useEffect(() => {
    const savedConfig = loadConfig();
    if (savedConfig) {
      // Ensure thursdayIsWeekend exists and is a boolean (for backward compatibility)
      // Preserve the exact value if it exists, only set default if missing
      if (savedConfig.thursdayIsWeekend === undefined || savedConfig.thursdayIsWeekend === null) {
        savedConfig.thursdayIsWeekend = true;
        saveConfig(savedConfig); // Update config with default value
      } else {
        // If it's a string, convert to boolean (handle edge cases)
        if (typeof savedConfig.thursdayIsWeekend === 'string') {
          savedConfig.thursdayIsWeekend = savedConfig.thursdayIsWeekend.toLowerCase() === 'true';
          saveConfig(savedConfig); // Save normalized value
        }
        // If it's already a boolean (true or false), preserve it exactly as-is
      }

      setConfig(savedConfig);
    }
    setLoading(false);

    // Listen for storage changes (e.g., config updated in another tab)
    const handleStorageChange = (e) => {
      if (e.key === CONFIG_STORAGE_KEY && e.newValue) {
        try {
          const updatedConfig = JSON.parse(e.newValue);
          // Ensure thursdayIsWeekend exists and is a boolean
          if (updatedConfig.thursdayIsWeekend === undefined || updatedConfig.thursdayIsWeekend === null) {
            updatedConfig.thursdayIsWeekend = true;
          } else if (typeof updatedConfig.thursdayIsWeekend === 'string') {
            // If it's a string, convert to boolean (handle edge cases)
            updatedConfig.thursdayIsWeekend = updatedConfig.thursdayIsWeekend.toLowerCase() === 'true';
          }
          // If it's already a boolean (true or false), preserve it exactly as-is
          setConfig(updatedConfig);
        } catch (error) {
          console.error('Error parsing config from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Save paid leave when it changes
  const handlePaidLeaveChange = (value) => {
    setPaidLeaveUsed(value);
    // Save to localStorage
    if (monthData && config) {
      try {
        saveMonthData(year, month, {
          timeEntries,
          dayStatuses,
          paidLeaveUsed: value,
        });
      } catch (error) {
        console.error("Error saving paid leave:", error);
      }
    }
  };

  // Fetch month data when year or month changes
  useEffect(() => {
    if (!config) return;

    setLoading(true);
    try {
      const data = fetchMonthData(year, month, config);
      setMonthData(data);

      // Load saved data from localStorage
      const savedData = loadMonthData(year, month);
      if (savedData) {
        // Filter entries and statuses to only include valid days
        const filteredEntries = {};
        const filteredStatuses = {};
        for (let day = 1; day <= data.daysInMonth; day++) {
          if (savedData.timeEntries[day]) {
            filteredEntries[day] = savedData.timeEntries[day];
          }
          if (savedData.dayStatuses[day]) {
            filteredStatuses[day] = savedData.dayStatuses[day];
          }
        }
        setTimeEntries(filteredEntries);
        setDayStatuses(filteredStatuses);
        setPaidLeaveUsed(savedData.paidLeaveUsed || 0);
      } else {
        // No saved data, initialize empty
        setTimeEntries({});
        setDayStatuses({});
        setPaidLeaveUsed(0);
      }
    } catch (error) {
      console.error("Error loading month data:", error);
    } finally {
      setLoading(false);
    }
  }, [year, month, config]);

  const handleYearChange = (newYear) => {
    setYear(newYear);
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const handleTimeUpdate = (day, checkIn, checkOut) => {
    setTimeEntries((prev) => {
      const updated = {
        ...prev,
        [day]: { checkIn, checkOut },
      };
      // Save to localStorage
      if (monthData) {
        try {
          saveMonthData(year, month, {
            timeEntries: updated,
            dayStatuses,
            paidLeaveUsed,
          });
        } catch (error) {
          console.error("Error saving time update:", error);
        }
      }
      return updated;
    });
  };

  const handleStatusChange = (day, statusType, value) => {
    setDayStatuses((prev) => {
      const updated = {
        ...prev,
        [day]: {
          ...prev[day],
          [statusType]: value,
        },
      };
      // Save to localStorage
      if (monthData) {
        try {
          saveMonthData(year, month, {
            timeEntries,
            dayStatuses: updated,
            paidLeaveUsed,
          });
        } catch (error) {
          console.error("Error saving status change:", error);
        }
      }
      return updated;
    });
  };

  const handleConfigSave = (newConfig) => {
    // Save the config exactly as received (thursdayIsWeekend is already a boolean from Configuration component)
    // If for some reason it's missing, default to true
    const configToSave = {
      ...newConfig,
      thursdayIsWeekend: newConfig.thursdayIsWeekend ?? true,
    };
    setConfig(configToSave);
    try {
      saveConfig(configToSave);
    } catch (error) {
      console.error("Error saving config:", error);
    }
  };

  const totalHours = useMemo(() => {
    if (!monthData) return 0;
    let total = 0;
    for (let day = 1; day <= monthData.daysInMonth; day++) {
      const status = dayStatuses[day];

      // Skip days marked as not going
      if (status && status.notGoing) {
        continue;
      }

      // If holiday, add 8 hours
      if (status && status.holiday) {
        total += 8;
        continue;
      }

      // Otherwise, calculate from check-in/check-out times
      const entry = timeEntries[day];
      if (entry && entry.checkIn && entry.checkOut) {
        total += calculateWorkHours(entry.checkIn, entry.checkOut);
      }
    }
    return total;
  }, [timeEntries, dayStatuses, monthData]);

  // Handle scroll detection to show sticky summary after passing summary section
  useEffect(() => {
    const handleScroll = () => {
      if (!summaryRef.current) {
        setShowStickySummary(false);
        return;
      }

      const summaryRect = summaryRef.current.getBoundingClientRect();
      // Show sticky summary when the bottom of the summary section has scrolled past the top of viewport
      const shouldShow = summaryRect.bottom < 0;

      setShowStickySummary(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [monthData]); // Re-run when month data changes (summary might reposition)

  // Show loading while loading config
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: { xs: "100dvh", sm: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress size={40} />
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // Show configuration if not set
  if (!config) {
    // Try to load existing config for "Change Settings" scenario
    const existingConfig = loadConfig();
    return (
      <Configuration
        onSave={handleConfigSave}
        initialConfig={
          existingConfig || {
            monthlySalary: DEFAULT_MONTHLY_SALARY,
            requiredHours: DEFAULT_REQUIRED_HOURS,
            paidLeaveHours: DEFAULT_PAID_LEAVE_HOURS,
            thursdayIsWeekend: true,
          }
        }
      />
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: { xs: "100dvh", sm: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress size={40} />
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: { xs: "100dvh", sm: "100vh" },
        bgcolor: "background.default",
      }}
    >
      {/* Sticky Summary Header - Only show after scrolling past summary */}
      {config && (
        <Fade
          in={showStickySummary}
          timeout={{ enter: 150, exit: 100 }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1000,
            }}
          >
            <StickySummary
              totalHours={totalHours}
              paidLeaveUsed={paidLeaveUsed}
              config={config}
            />
          </Box>
        </Fade>
      )}

      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1, sm: 2 },
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Header */}
        <Box sx={{ mb: { xs: 3, sm: 4 }, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              fontWeight: 600,
              color: "text.primary",
              mb: 1,
            }}
          >
            Timesheet Tracker
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, mb: 1 }}
          >
            Track your work hours and calculate salary
          </Typography>
          {monthData && (
            <Paper
              elevation={0}
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.5,
                mt: 1,
                bgcolor: "primary.main",
                color: "white",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {getFingilishMonthName(month)} {year}
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Controls */}
        <Stack
          spacing={2}
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            maxWidth: { xs: "100%", md: "900px" },
            mx: "auto",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <MonthSelector
              year={year}
              month={month}
              onYearChange={handleYearChange}
              onMonthChange={handleMonthChange}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <PaidLeaveInput
              paidLeaveUsed={paidLeaveUsed}
              onPaidLeaveChange={handlePaidLeaveChange}
              paidLeaveHours={config.paidLeaveHours}
            />
          </Box>
        </Stack>

        {/* Summary */}
        <Box
          ref={summaryRef}
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: "900px" } }}>
            <Summary
              totalHours={totalHours}
              paidLeaveUsed={paidLeaveUsed}
              config={config}
            />
          </Box>
        </Box>

        {/* Days Grid */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 2,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              fontWeight: 600,
              color: "text.primary",
              alignSelf: { xs: "flex-start", sm: "center" },
            }}
          >
            Daily Entries
          </Typography>
          {monthData && (
            <Grid
              container
              spacing={{ xs: 1.5, sm: 2 }}
              sx={{
                maxWidth: { xs: "100%", md: "1200px" },
                justifyContent: "center",
              }}
            >
              {monthData.days.map((dayInfo) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={dayInfo.day}>
                  <DayEntry
                    day={dayInfo.day}
                    dayName={dayInfo.dayName}
                    checkIn={timeEntries[dayInfo.day]?.checkIn || ""}
                    checkOut={timeEntries[dayInfo.day]?.checkOut || ""}
                    notGoing={dayStatuses[dayInfo.day]?.notGoing || false}
                    holiday={dayStatuses[dayInfo.day]?.holiday || false}
                    isWeekend={dayInfo.isWeekend || false}
                    month={monthData.month}
                    year={monthData.year}
                    onUpdate={handleTimeUpdate}
                    onStatusChange={handleStatusChange}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            pt: 3,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 1 }}
          >
            Base: {formatCurrency(config.monthlySalary)} T • Required:{" "}
            {config.requiredHours}h • Leave: {config.paidLeaveHours}h
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                if (window.confirm("Do you want to change the settings?")) {
                  setConfig(null);
                }
              }}
              size="small"
              variant="text"
              sx={{ textTransform: "none" }}
            >
              Change Settings
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
