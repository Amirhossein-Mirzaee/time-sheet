import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  FINGILISH_MONTHS,
  getCurrentPersianDate,
} from "../utils/persianCalendar";
import { getAvailableYears } from "../services/calendarApi";

const MonthSelector = ({ year, month, onYearChange, onMonthChange }) => {
  const availableYears = getAvailableYears();
  const currentDate = getCurrentPersianDate();

  return (
    <Card elevation={0}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Select Month
        </Typography>
        <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
          <FormControl fullWidth size="small">
            <InputLabel>Year</InputLabel>
            <Select
              value={year}
              label="Year"
              onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
            >
              {availableYears.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Month</InputLabel>
            <Select
              value={month}
              label="Month"
              onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
            >
              {FINGILISH_MONTHS.map((monthName, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {monthName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Button
            size="small"
            variant="text"
            onClick={() => {
              onYearChange(currentDate.year);
              onMonthChange(currentDate.month);
            }}
            sx={{ textTransform: "none", fontSize: "0.875rem" }}
          >
            Current Month
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthSelector;
