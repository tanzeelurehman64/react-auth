import { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signup } from 'services';
import { appRoutes } from 'appConstants';

// INFO: Validation schema using Yup
const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Za-z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*#?&]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
});

const Signup = () => {
  const [formStatus, setFormStatus] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await signup(values);
        if (response?.data) {
          // INFO: Delay just display signup message
          setTimeout(() => {
            navigate(appRoutes.signin);
          }, 2000);
        }
        setFormStatus('User created successfully!');
      } catch (error: any) {
        setFormStatus('Signup failed: ' + error.response.data.message);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Signup
        </Typography>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
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
              Signup
            </Button>
          </form>
        </FormikProvider>
        {formStatus && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {formStatus}
          </Typography>
        )}
        <Button variant="text" onClick={() => navigate(appRoutes.signin)}>
          Signin Here
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
