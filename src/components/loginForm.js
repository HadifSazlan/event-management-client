import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { handleLogin } from "../controllers/auth.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = () => {
    const { email, password } = getValues();
    handleLogin({ email, password }, navigate);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register("email", { required: "Email is required" })}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("password", { required: "Password is required" })}
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Log In
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/" variant="body2">
            Don't have an account? Register
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
