import Button from "@mui/material/Button";
import { Box } from "@mui/material";
export default function ButtonUsage() {
  return (
    <Box sx={[{ "&:hover": { color: "red", backgroundColor: "blue" } }]}>
      <Button variant="outlined">Hello world</Button>
    </Box>
  );
}
