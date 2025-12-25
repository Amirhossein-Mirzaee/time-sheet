import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import MonthSelector from "./components/MonthSelector";
import DayEntry from "./components/DayEntry";
import Summary from "./components/Summary";
import PaidLeaveInput from "./components/PaidLeaveInput";
import Configuration from "./components/Configuration";
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

  // Save paid leave when it changes
  const handlePaidLeaveChange = (value) => {
    setPaidLeaveUsed(value);
    // Save to localStorage
    if (monthData && config) {
      saveMonthData(year, month, {
        timeEntries,
        dayStatuses,
        paidLeaveUsed: value,
      });
    }
  };

  // Load configuration on mount
  useEffect(() => {
    const savedConfig = loadConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  // Fetch month data when year or month changes
  useEffect(() => {
    const loadMonthDataAsync = async () => {
      setLoading(true);
      try {
        const data = await fetchMonthData(year, month);
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
    };

    loadMonthDataAsync();
  }, [year, month]);

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
        saveMonthData(year, month, {
          timeEntries: updated,
          dayStatuses,
          paidLeaveUsed,
        });
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
        saveMonthData(year, month, {
          timeEntries,
          dayStatuses: updated,
          paidLeaveUsed,
        });
      }
      return updated;
    });
  };

  const handleConfigSave = (newConfig) => {
    setConfig(newConfig);
    saveConfig(newConfig);
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

  // Show configuration if not set
  if (!config) {
    return (
      <Configuration
        onSave={handleConfigSave}
        initialConfig={{
          monthlySalary: DEFAULT_MONTHLY_SALARY,
          requiredHours: DEFAULT_REQUIRED_HOURS,
          paidLeaveHours: DEFAULT_PAID_LEAVE_HOURS,
        }}
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
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
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
        </Box>
      </Container>
    </Box>
  );
};

export default App;
