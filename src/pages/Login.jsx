import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import useInput from "../hooks/useInput";
import EmailTextField from "../components/Textfield.component";
import { handleLoginSubmit } from "../helper/formHelper";
import Layout from "../pages/LayoutAuth.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { SnackbarContext } from "../components/SnackbarContext";

const Login = () => {
  const openSnackbar = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");

  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const onSubmit = async (evt) => {
    const loginSuccess = await handleLoginSubmit(
      evt,
      email,
      password,
      resetEmail,
      resetPassword
    );

    if (loginSuccess) {
      openSnackbar("Login successful!", "success");
      navigate("/home");
    } else {
      openSnackbar("Login failed!", "error");
    }
  };
  return (
    <Layout>
      <form onSubmit={onSubmit} style={{ width: "300px" }}>
        <Grid
          container
          spacing={2}
          style={{ marginTop: "20px", justifyContent: "center" }}
        >
          <Typography
            variant="h6"
            component="h5"
            gutterBottom
            style={{ color: " #7d2e0d", fontWeight: "bold" }}
          >
            Login
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EmailTextField
              fullWidth
              label="Email"
              variant="outlined"
              {...bindEmail}
              InputLabelProps={{
                shrink: true,
                style: { fontWeight: "bold", color: "#7d2e0d" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              {...bindPassword}
              InputLabelProps={{
                shrink: true,
                style: { fontWeight: "bold", color: "#7d2e0d" },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#7d2e0d" }}
            >
              Login
            </Button>
            <p style={{ fontSize: "11px", textAlign: "left" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "blue" }}>
                Register
              </Link>
            </p>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default Login;
