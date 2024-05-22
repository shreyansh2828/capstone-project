// {"id":"659f","proofId":"23685340-cbdb-48ef-8a91-54931859f8d3","email":"amit@mishra.com","username":"amit","password":"amit@123"}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { baseApiUrl, assetsPath, defaultUserImage } from "../Constant";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h5" component="div" style={{ marginTop: "20px" }}>
        Profile Page
      </Typography>
      <Grid container justifyContent="center">
        <Card>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                height="140"
                image={baseApiUrl + assetsPath + defaultUserImage} 
                alt="Default Image"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <CardContent style={{ textAlign: "left" }}>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ marginBottom: "15px" }}
                >
                  {user.username} Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Email :</b> {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Username :</b> {user.username}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default Profile;
