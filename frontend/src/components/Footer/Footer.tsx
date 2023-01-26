import { Box } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      Creado por Martin Daniel Perez Puchuri
    </Box>
  );
}

export default Footer;
