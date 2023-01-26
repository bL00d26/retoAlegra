import { Box } from '@mui/material';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          sx={{
            background: '#D3D3D3',
            width: '100%',
            flex: 5,
            height: '100vh',
            overflowX: 'hidden',
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
