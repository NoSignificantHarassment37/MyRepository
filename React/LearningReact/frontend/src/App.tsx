import { Button, Typography, Stack } from '@mui/material'

function App() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Typography variant="h4">Probando Material UI</Typography>

      <Button variant="contained" color="primary">
        Botón principal
      </Button>

      <Button variant="outlined" color="secondary">
        Botón secundario
      </Button>

      <Button variant="text" color="success">
        Botón de texto
      </Button>
    </Stack>
  )
}

export default App
