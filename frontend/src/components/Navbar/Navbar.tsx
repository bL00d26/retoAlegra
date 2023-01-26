import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleOnClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };
  return (
    <Box>
      <AppBar position="sticky" elevation={0} sx={{ background: '#000000' }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={(e) => handleOnClick(e)}
            >
              <FoodBankIcon
                sx={{
                  display: { md: 'flex' },
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                RESTAURANT APP
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
