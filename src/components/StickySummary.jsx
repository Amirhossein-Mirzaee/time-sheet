import { Box, Paper, Typography } from "@mui/material";
import { calculateSalary, formatCurrency } from "../utils/salaryUtils";

const StickySummary = ({ totalHours, paidLeaveUsed = 0, config }) => {
  const salaryData = calculateSalary(totalHours, paidLeaveUsed, config);

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 0,
        borderBottom: 1,
        borderColor: "divider",
        py: 1.5,
        px: { xs: 2, sm: 3 },
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flex: 1,
          }}
        >
          <Typography
            variant="overline"
            fontWeight={600}
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            Hours:
          </Typography>
          <Typography
            variant="overline"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "success.main",
            }}
          >
            {salaryData.totalHours.toFixed(1)}h
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="overline"
            fontWeight={600}
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            Salary:
          </Typography>
          <Typography
            variant="overline"
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "success.main",
            }}
          >
            {formatCurrency(salaryData.totalPay)} T
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default StickySummary;
