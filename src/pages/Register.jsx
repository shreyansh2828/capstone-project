import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import useInput from "../hooks/useInput";
import EmailTextField from "../components/Textfield.component";
import { handleRegisterSubmit } from "../helper/formHelper";
import Layout from "../pages/LayoutAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { SnackbarContext } from "../components/SnackbarContext";
import { useContext } from "react";

const Register = () => {
  const openSnackbar = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername,
  } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
  const {
    value: confirmPassword,
    bind: bindConfirmPassword,
    reset: resetConfirmPassword,
  } = useInput("");

  const onSubmit = async (evt) => {
    const registerResponse = await handleRegisterSubmit(
      evt,
      email,
      username,
      password,
      confirmPassword,
      resetEmail,
      resetUsername,
      resetPassword,
      resetConfirmPassword
    );
    if (registerResponse === "success") {
      openSnackbar("Register successful!", "success");
      navigate("/login");
    } else {
      openSnackbar(registerResponse, "error");
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
            Register
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              {...bindUsername}
              InputLabelProps={{
                shrink: true,
                style: { fontWeight: "bold", color: "#7d2e0d" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  {...bindConfirmPassword}
                  InputLabelProps={{
                    shrink: true,
                    style: { fontWeight: "bold", color: "#7d2e0d" },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

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
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#7d2e0d" }}
            >
              Register
            </Button>
            <p style={{ fontSize: "11px", textAlign: "left" }}>
              Already have account?{" "}
              <Link to="/login" style={{ color: "blue" }}>
                Login
              </Link>
            </p>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default Register;
