// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Url } from "../../../interfaces";
import { useEffect } from "react";

const Register = () => {
  const toastId = "registertoast";
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    givenName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required").min(4),
    password: Yup.string()
      .required("Password is required")
    
  });

  const formik = useFormik({
    initialValues: {
      givenName: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      toast.loading("Please wait", { id: toastId });
      // Perform your registration logic here
      axios
        .post(`${Url}/user/register`, values)
        .then((response) => {
          toast.success("Registered Successfully", { id: toastId });
          navigate("/login");
          console.log(response)
        })
        .catch((error) => {
          toast.error("Registration failed", { id: toastId });
          console.log(error)
        });
    },
  });
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      // navigate('/welcome');
    }
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg mt-[170px] mb-[100px] p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Registration</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <TextField
              name="givenName"
              label="Full Name"
              value={formik.values.givenName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.givenName && Boolean(formik.errors.givenName)}
              helperText={formik.touched.givenName && formik.errors.givenName}
              type="text"
              placeholder="Enter your Name"
              required
              fullWidth
            />
          </div>

          <div className="mb-4">
            <TextField
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              type="email"
              placeholder="Enter your email"
              required
              fullWidth
            />
          </div>

          <div className="mb-4">
            <TextField
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              type="text"
              placeholder="Enter your username"
              required
              fullWidth
            />
          </div>

          <div className="mb-4">
            <TextField
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
              placeholder="Enter your Password"
              required
              fullWidth
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            {formik.isSubmitting ? "Loading..." : "Register"}
          </button>
        </form>

        <span className="text-sm text-gray-600 mt-4 block text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-500 hover:underline">
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;