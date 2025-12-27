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
      <CardContent
        sx={{
          px: 3,
          py: { xs: 2.5, sm: 3 },
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
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

        <Grid
          container
          spacing={2}
          sx={{
            mb: 3,
            justifyContent: "center",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {/* Hours Summary */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "background.paper",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                paddingRight: "24px",
                paddingLeft: "24px",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "text.primary",
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
                    gap: 5,
                  }}
                >
                  <Typography variant="overline" color="text.secondary">
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
                    gap: 5,
                  }}
                >
                  <Typography variant="overline" color="text.secondary">
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
                    gap: 5,
                  }}
                >
                  <Typography variant="overline" color="text.secondary">
                    Paid Leave Used
                  </Typography>
                  <Typography
                    variant="overline"
                    color="primary"
                    fontWeight={500}
                  >
                    {salaryData.paidLeaveUsed.toFixed(2)}h
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Typography variant="overline" color="text.secondary">
                    Total Paid Leave
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
                        gap: 5,
                      }}
                    >
                      <Typography
                        variant="overline"
                        color="warning.main"
                        fontWeight={500}
                      >
                        Remaining
                      </Typography>
                      <Typography
                        variant="overline"
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
                        gap: 5,
                      }}
                    >
                      <Typography
                        variant="overline"
                        color="success.main"
                        fontWeight={500}
                      >
                        Overtime
                      </Typography>
                      <Typography
                        variant="overline"
                        color="success.main"
                        fontWeight={600}
                      >
                        {salaryData.hoursOver.toFixed(2)}h
                      </Typography>
                    </Box>
                  </>
                )}
              </Stack>
            </div>
          </div>

          {/* Salary Summary */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "background.paper",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                paddingRight: "24px",
                paddingLeft: "24px",
                  paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "text.primary",
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
                    gap: 5,
                  }}
                >
                  <Typography variant="overline" color="text.secondary">
                    Hourly Rate
                  </Typography>
                  <Typography variant="overline" fontWeight={500}>
                    {formatCurrency(salaryData.hourlyRate)} T
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Typography variant="overline" color="text.secondary">
                    Regular Pay
                  </Typography>
                  <Typography variant="overline" fontWeight={500}>
                    {formatCurrency(salaryData.regularPay)} T
                  </Typography>
                </Box>
                {salaryData.overtimeHours > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Typography variant="overline" color="text.secondary">
                      Overtime Pay
                    </Typography>
                    <Typography
                      variant="body2"
                      color="success.main"
                      fontWeight={600}
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
                    gap: 5,
                  }}
                >
                  <Typography variant="overline" fontWeight={600}>
                    Total
                  </Typography>
                  <Typography variant="body1" color="primary" fontWeight={700}>
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
            </div>
          </div>
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
