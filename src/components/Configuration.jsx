import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { formatCurrency } from "../utils/salaryUtils";
import { vibrateSuccess, vibrateError } from "../utils/vibration";

const Configuration = ({ onSave, initialConfig }) => {
  const [monthlySalary, setMonthlySalary] = useState(
    initialConfig?.monthlySalary || 30000000
  );
  const [requiredHours, setRequiredHours] = useState(
    initialConfig?.requiredHours || 176
  );
  const [paidLeaveHours, setPaidLeaveHours] = useState(
    initialConfig?.paidLeaveHours || 20
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!monthlySalary || monthlySalary <= 0) {
      newErrors.monthlySalary = "Monthly salary must be greater than zero";
    }

    if (!requiredHours || requiredHours <= 0) {
      newErrors.requiredHours = "Required hours must be greater than zero";
    }

    if (paidLeaveHours < 0) {
      newErrors.paidLeaveHours = "Paid leave hours cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      vibrateSuccess();
      onSave({
        monthlySalary: parseFloat(monthlySalary),
        requiredHours: parseFloat(requiredHours),
        paidLeaveHours: parseFloat(paidLeaveHours),
      });
    } else {
      vibrateError();
    }
  };

  const hourlyRate =
    monthlySalary && requiredHours ? monthlySalary / requiredHours : 0;

  return (
    <Box
      sx={{
        minHeight: { xs: "100dvh", sm: "100vh" },
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 500,
          width: "100%",
          border: 1,
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600, mb: 1 }}
            >
              Initial Setup
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your salary and work hours information
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Monthly Salary (Tomans)"
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                required
                fullWidth
                error={!!errors.monthlySalary}
                helperText={errors.monthlySalary}
                inputProps={{ min: 0, step: 1000 }}
                placeholder="30000000"
              />

              <TextField
                label="Required Hours per Month"
                type="number"
                value={requiredHours}
                onChange={(e) => setRequiredHours(e.target.value)}
                required
                fullWidth
                error={!!errors.requiredHours}
                helperText={errors.requiredHours}
                inputProps={{ min: 0, step: 0.5 }}
                placeholder="176"
              />

              <TextField
                label="Paid Leave Hours"
                type="number"
                value={paidLeaveHours}
                onChange={(e) => setPaidLeaveHours(e.target.value)}
                fullWidth
                error={!!errors.paidLeaveHours}
                helperText={errors.paidLeaveHours}
                inputProps={{ min: 0, step: 0.5 }}
                placeholder="20"
              />

              {monthlySalary && requiredHours && hourlyRate > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    bgcolor: "primary.main",
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      opacity: 0.9,
                      display: "block",
                      mb: 1.5,
                    }}
                  >
                    Preview
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Hourly Rate
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ textAlign: "right" }}
                      >
                        {formatCurrency(hourlyRate)} T
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Monthly Salary
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ textAlign: "right" }}
                      >
                        {formatCurrency(monthlySalary)} T
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 1,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Save and Continue
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Configuration;
