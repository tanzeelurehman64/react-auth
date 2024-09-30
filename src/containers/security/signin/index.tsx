import { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signin } from 'services';
import { appRoutes } from 'appConstants';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Signin = () => {
  const [formStatus, setFormStatus] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      try {
        const response = await signin(values);
        if (response?.data) {
          setTimeout(() => {
            navigate(appRoutes.home);
          }, 2000);
        }
        setFormStatus('Login successful!');
      } catch (error: any) {
        setFormStatus('Signin failed: ' + error.response.data.message);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Signin
        </Typography>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Signin
            </Button>
          </form>
        </FormikProvider>
        {formStatus && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {formStatus}
          </Typography>
        )}
        <Button variant="text" onClick={() => navigate(appRoutes.signup)}>
          Signup Here
        </Button>
      </Box>
    </Container>
  );
};

export default Signin;
