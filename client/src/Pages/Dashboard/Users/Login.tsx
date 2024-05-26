import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { LoginFn, reset } from '../../../redux/Slices/Dashboard/User/Login';
import { TextField, Typography, Box, Container, Grid } from '@mui/material';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

export const Login: React.FC = () => {
  const toastId: string = 'login';
  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/dashboard');
    }
  }, []);


  useEffect(() => {
    if (loginState.isSuccess) {
      toast.success('Login Successfully', { id: toastId });
      location.reload()
      navigate('/welcome');
    }
    if (loginState.isError) {
      toast.error(loginState.errorMsg, { id: toastId });
    }
  
    dispatch(reset());
  }, [loginState.isError, loginState.isSuccess]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: { email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const { email, password } = values;

    const data = {
      email,
      password,
    };

    toast.loading('Loading! Please wait', { id: toastId });

    dispatch(LoginFn(data));

    setSubmitting(false);
  };

  return (
    <div className='flex justify-center items-center min-h-screen  bg-gray-100'>
            <div className="bg-white shadow-xl  mt-32 rounded-lg mb-[100px] p-8 max-w-md w-full">
    <Box

    >
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      type="text"
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                    <span style={{color:'red'}}><ErrorMessage name="email" component="div"  /></span>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      type="password"  
                      name="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                    />
                     <span style={{color:'red'}}> <ErrorMessage   name="password" /></span>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mt: 2 }}>
                <button
                  type="submit"
                  className="w-full border border-green-500 py-3 rounded hover:bg-green-500"
                  disabled={loginState.isLoading}
                >
                  {loginState.isLoading ? 'Loading...' : 'Login'}
                </button>
              </Box>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link className='bg-green-300 p-2 text-white rounded' to="/register" style={{ color: 'Highlight' }}>
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Container>
    </Box>
    </div>
    </div>
  );
};