import { Box, Button, Typography } from '@mui/material';
import { appRoutes } from 'appConstants';
import { useNavigate } from 'react-router-dom';
import { logout } from 'services';

const Home = () => {
  const navigate = useNavigate();

  const signout = async () => {
    try {
      const response = await logout();
      if (response?.data) {
        navigate(appRoutes.signin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant="h2">Welcome to the application.</Typography>

      <Button color="error" onClick={signout}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
