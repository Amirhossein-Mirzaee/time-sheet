import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Stack,
  Alert,
} from "@mui/material";

const PaidLeaveInput = ({ paidLeaveUsed, onPaidLeaveChange, paidLeaveHours }) => {
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
          Paid Leave
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            type="number"
            value={paidLeaveUsed}
            onChange={(e) => onPaidLeaveChange(parseFloat(e.target.value) || 0)}
            inputProps={{ min: 0, max: paidLeaveHours, step: 0.5 }}
            size="small"
            sx={{ width: { xs: "100%", sm: 120 } }}
          />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-start" },
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {paidLeaveUsed} / {paidLeaveHours} hours
            </Typography>
            {paidLeaveUsed > paidLeaveHours && (
              <Alert severity="error" sx={{ mt: 1, py: 0.5, width: "100%" }}>
                Maximum {paidLeaveHours} hours
              </Alert>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PaidLeaveInput;
