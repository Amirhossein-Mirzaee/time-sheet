import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Grid,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { calculateWorkHours } from "../utils/timeUtils";
import { vibrateTap } from "../utils/vibration";

// Helper function to convert time string (HH:MM) to dayjs object
const stringToDayjs = (timeStr) => {
  if (!timeStr || !timeStr.trim()) return null;
  const parts = timeStr.trim().split(":");
  if (parts.length !== 2) return null;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return null;
  return dayjs().hour(hours).minute(minutes).second(0).millisecond(0);
};

// Helper function to convert dayjs object to time string (HH:MM)
const dayjsToString = (dayjsObj) => {
  if (!dayjsObj || !dayjsObj.isValid()) return "";
  return dayjsObj.format("H:mm");
};

const DayEntry = ({
  day,
  dayName,
  checkIn,
  checkOut,
  notGoing,
  holiday,
  isWeekend: propIsWeekend,
  month,
  year,
  onUpdate,
  onStatusChange,
}) => {
  const [localCheckIn, setLocalCheckIn] = useState(() =>
    stringToDayjs(checkIn || "")
  );
  const [localCheckOut, setLocalCheckOut] = useState(() =>
    stringToDayjs(checkOut || "")
  );
  const [checkInError, setCheckInError] = useState("");
  const [checkOutError, setCheckOutError] = useState("");

  // Sync local state with props when they change externally
  useEffect(() => {
    const newCheckIn = stringToDayjs(checkIn || "");
    const newCheckOut = stringToDayjs(checkOut || "");

    // Only update state if the parsed values are different
    const currentCheckInStr = localCheckIn ? dayjsToString(localCheckIn) : "";
    const currentCheckOutStr = localCheckOut
      ? dayjsToString(localCheckOut)
      : "";

    if (currentCheckInStr !== (checkIn || "")) {
      setLocalCheckIn(newCheckIn);
    }
    if (currentCheckOutStr !== (checkOut || "")) {
      setLocalCheckOut(newCheckOut);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIn, checkOut]);

  const handleCheckInChange = (value) => {
    setLocalCheckIn(value);
    setCheckInError("");

    const checkInStr = dayjsToString(value);
    const checkOutStr = dayjsToString(localCheckOut);

    if (value && localCheckOut && value.isValid() && localCheckOut.isValid()) {
      const hours = calculateWorkHours(checkInStr, checkOutStr);
      if (hours <= 0) {
        setCheckOutError("Check-out must be after check-in");
      } else {
        setCheckOutError("");
      }
    }

    onUpdate(day, checkInStr, checkOutStr);
  };

  const handleCheckOutChange = (value) => {
    setLocalCheckOut(value);
    setCheckOutError("");

    const checkInStr = dayjsToString(localCheckIn);
    const checkOutStr = dayjsToString(value);

    if (value && localCheckIn && value.isValid() && localCheckIn.isValid()) {
      const hours = calculateWorkHours(checkInStr, checkOutStr);
      if (hours <= 0) {
        setCheckOutError("Check-out must be after check-in");
      } else {
        setCheckOutError("");
      }
    }

    onUpdate(day, checkInStr, checkOutStr);
  };

  const handleNotGoingToggle = () => {
    vibrateTap();
    onStatusChange(day, "notGoing", !notGoing);
    if (!notGoing && holiday) {
      onStatusChange(day, "holiday", false);
    }
  };

  const handleHolidayToggle = () => {
    vibrateTap();
    onStatusChange(day, "holiday", !holiday);
    if (!holiday && notGoing) {
      onStatusChange(day, "notGoing", false);
    }
  };

  const workHours = calculateWorkHours(
    dayjsToString(localCheckIn),
    dayjsToString(localCheckOut)
  );
  const isWeekend = propIsWeekend || false;
  const isNotGoing = notGoing || false;
  const isHoliday = holiday || false;

  // Determine card styling
  let cardSx = {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: 3,
    },
  };

  if (isHoliday) {
    cardSx.bgcolor = "rgba(34, 197, 94, 0.05)";
    cardSx.border = "1px solid";
    cardSx.borderColor = "success.main";
  } else if (isNotGoing) {
    cardSx.bgcolor = "rgba(239, 68, 68, 0.05)";
    cardSx.border = "1px solid";
    cardSx.borderColor = "error.main";
  } else if (isWeekend) {
    cardSx.bgcolor = "rgba(59, 130, 246, 0.05)";
    cardSx.border = "1px solid";
    cardSx.borderColor = "info.main";
  } else {
    cardSx.bgcolor = "background.paper";
  }

  return (
    <Card elevation={0} sx={cardSx}>
      {/* Red line through for not going */}
      {/* {isNotGoing && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1.5px",
            bgcolor: "error.main",
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />
      )} */}
      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
        <Stack spacing={2}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: isWeekend ? "info.main" : "text.primary",
                  mb: 0.5,
                }}
              >
                {month && year ? `${month}/${day}` : `Day ${day}`}
              </Typography>
              {dayName && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontFamily: "'Vazir', 'Fira Code', monospace",
                    fontSize: "0.75rem",
                  }}
                >
                  {dayName}
                </Typography>
              )}
            </Box>
            <Stack
              direction="row"
              spacing={0.5}
              flexWrap="wrap"
              justifyContent="flex-end"
              alignItems="center"
            >
              {isWeekend && (
                <Chip
                  label="Weekend"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    bgcolor: "info.main",
                    color: "white",
                  }}
                />
              )}
              {workHours > 0 && !isNotGoing && !isHoliday && (
                <Chip
                  label={`${workHours.toFixed(2)}h`}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    bgcolor: "success.main",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              )}
              {isNotGoing && (
                <Chip
                  label="Not Going"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    bgcolor: "error.main",
                    color: "white",
                  }}
                />
              )}
              {isHoliday && (
                <Chip
                  label="Holiday"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    bgcolor: "success.main",
                    color: "white",
                  }}
                />
              )}
            </Stack>
          </Box>

          {/* Status Options */}
          <Stack direction="row" spacing={1} alignItems="stretch">
            <Button
              variant={isNotGoing ? "contained" : "outlined"}
              color="error"
              size="small"
              fullWidth
              onClick={handleNotGoingToggle}
              disabled={isWeekend}
              sx={{
                minHeight: { xs: 36, sm: 32 },
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              Not Going
            </Button>
            <Button
              variant={isHoliday ? "contained" : "outlined"}
              color="success"
              size="small"
              fullWidth
              onClick={handleHolidayToggle}
              disabled={isWeekend}
              sx={{
                minHeight: { xs: 36, sm: 32 },
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              Holiday
            </Button>
          </Stack>

          {/* Time Inputs */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid
              container
              spacing={1.5}
              sx={{ alignItems: "flex-start", flexWrap: "wrap" }}
            >
              <Grid sx={{ width: "100%" }} item xs={6} sm={12}>
                <TimePicker
                  label="Check-in"
                  value={localCheckIn}
                  onChange={handleCheckInChange}
                  disabled={isWeekend || isNotGoing || isHoliday}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: !!checkInError,
                      helperText: checkInError,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          fontSize: "0.875rem",
                        },
                        width: "100%",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid sx={{ width: "100%" }} item xs={6}>
                <TimePicker
                  label="Check-out"
                  value={localCheckOut}
                  onChange={handleCheckOutChange}
                  disabled={isWeekend || isNotGoing || isHoliday}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: !!checkOutError,
                      helperText: checkOutError,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          fontSize: "0.875rem",
                        },
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DayEntry;
