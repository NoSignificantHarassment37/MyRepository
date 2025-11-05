import { Button, Typography, Container } from "@mui/material";

export default function App() {
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        MUI funcionando 🎉
      </Typography>
      <Button variant="contained" color="primary">
        ¡Hola mundo!
      </Button>
    </Container>
  );
}
