import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Stack,
  Divider,
} from "@mui/material";
import { calculateSalary, formatCurrency } from "../utils/salaryUtils";

const Summary = ({ totalHours, paidLeaveUsed = 0, config }) => {
  const salaryData = calculateSalary(totalHours, paidLeaveUsed, config);

  const progressPercentage = Math.min(
    100,
    (salaryData.totalHours / config.requiredHours) * 100
  );

  const getProgressColor = () => {
    if (salaryData.totalHours >= config.requiredHours) return "success";
    if (salaryData.totalHours >= config.requiredHours * 0.8) return "warning";
    return "primary";
  };

  return (
    <Card elevation={0}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 3,
            fontSize: { xs: "1.125rem", sm: "1.25rem" },
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Summary
        </Typography>

        <Grid container spacing={2.5} sx={{ mb: 3, justifyContent: "center" }}>
          {/* Hours Summary */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2.5,
                bgcolor: "background.paper",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "text.secondary",
                  letterSpacing: "0.08em",
                  display: "block",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Work Hours
              </Typography>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {totalHours.toFixed(2)}h
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Required
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {config.requiredHours}h
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Paid Leave Used
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight={500}>
                    {salaryData.paidLeaveUsed.toFixed(2)}h
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Paid Leave Left
                  </Typography>
                  <Typography
                    variant="body2"
                    color="success.main"
                    fontWeight={500}
                  >
                    {salaryData.paidLeaveRemaining.toFixed(2)}h
                  </Typography>
                </Box>
                {salaryData.hoursRemaining > 0 && (
                  <>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="warning.main"
                        fontWeight={500}
                      >
                        Remaining
                      </Typography>
                      <Typography
                        variant="body2"
                        color="warning.main"
                        fontWeight={600}
                      >
                        {salaryData.hoursRemaining.toFixed(2)}h
                      </Typography>
                    </Box>
                  </>
                )}
                {salaryData.hoursOver > 0 && (
                  <>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="success.main"
                        fontWeight={500}
                      >
                        Overtime
                      </Typography>
                      <Typography
                        variant="body2"
                        color="success.main"
                        fontWeight={600}
                      >
                        {salaryData.hoursOver.toFixed(2)}h
                      </Typography>
                    </Box>
                  </>
                )}
              </Stack>
            </Box>
          </Grid>

          {/* Salary Summary */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2.5,
                bgcolor: "background.paper",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "text.secondary",
                  letterSpacing: "0.08em",
                  display: "block",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Salary
              </Typography>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Hourly Rate
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatCurrency(salaryData.hourlyRate)} T
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Regular Pay
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatCurrency(salaryData.regularPay)} T
                  </Typography>
                </Box>
                {salaryData.overtimeHours > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Overtime Pay
                    </Typography>
                    <Typography
                      variant="body2"
                      color="success.main"
                      fontWeight={500}
                    >
                      {formatCurrency(salaryData.overtimePay)} T
                    </Typography>
                  </Box>
                )}
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Total Pay
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight={700}>
                    {formatCurrency(salaryData.totalPay)} T
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", pt: 1, textAlign: "center" }}
                >
                  Base: {formatCurrency(config.monthlySalary)} T
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Progress Bar */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {progressPercentage.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            color={getProgressColor()}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: "rgba(0, 0, 0, 0.04)",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Summary;
