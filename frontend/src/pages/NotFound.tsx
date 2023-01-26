import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              La página que estás buscando no existe.
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#000000' }}>
              Volver al inicio
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NotFound;
