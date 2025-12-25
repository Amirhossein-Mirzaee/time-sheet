import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Grid,
} from "@mui/material";
import { calculateWorkHours, isValidTimeFormat } from "../utils/timeUtils";
import { vibrateTap } from "../utils/vibration";

const DayEntry = ({
  day,
  dayName,
  checkIn,
  checkOut,
  notGoing,
  holiday,
  onUpdate,
  onStatusChange,
}) => {
  const [localCheckIn, setLocalCheckIn] = useState(checkIn || "");
  const [localCheckOut, setLocalCheckOut] = useState(checkOut || "");
  const [checkInError, setCheckInError] = useState("");
  const [checkOutError, setCheckOutError] = useState("");

  useEffect(() => {
    setLocalCheckIn(checkIn || "");
    setLocalCheckOut(checkOut || "");
  }, [checkIn, checkOut]);

  const handleCheckInChange = (value) => {
    setLocalCheckIn(value);
    setCheckInError("");

    if (value && !isValidTimeFormat(value)) {
      setCheckInError("Invalid time format (use H:MM or HH:MM)");
      return;
    }

    if (value && localCheckOut) {
      const hours = calculateWorkHours(value, localCheckOut);
      if (hours <= 0) {
        setCheckOutError("Check-out must be after check-in");
      } else {
        setCheckOutError("");
      }
    }

    onUpdate(day, value, localCheckOut);
  };

  const handleCheckOutChange = (value) => {
    setLocalCheckOut(value);
    setCheckOutError("");

    if (value && !isValidTimeFormat(value)) {
      setCheckOutError("Invalid time format (use H:MM or HH:MM)");
      return;
    }

    if (value && localCheckIn) {
      const hours = calculateWorkHours(localCheckIn, value);
      if (hours <= 0) {
        setCheckOutError("Check-out must be after check-in");
      } else {
        setCheckOutError("");
      }
    }

    onUpdate(day, localCheckIn, value);
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

  const workHours = calculateWorkHours(localCheckIn, localCheckOut);
  const isWeekend = dayName === "Friday" || dayName === "Thursday";
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
                Day {day}
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
          <Grid container spacing={1.5} sx={{ alignItems: "flex-start" }}>
            <Grid item xs={6}>
              <TextField
                label="Check-in"
                value={localCheckIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                placeholder="7:50"
                disabled={isNotGoing || isHoliday}
                fullWidth
                size="small"
                error={!!checkInError}
                helperText={checkInError}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Check-out"
                value={localCheckOut}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                placeholder="16:30"
                disabled={isNotGoing || isHoliday}
                fullWidth
                size="small"
                error={!!checkOutError}
                helperText={checkOutError}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DayEntry;
