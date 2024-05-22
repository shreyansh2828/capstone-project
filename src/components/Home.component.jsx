// create three cards column-wise using grid in the page using @mui/material
// shuld have thumbnail, title, price and button to view details
//all should left align except thumbnail
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import CardComponent from "../components/Card.component";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const [carDetails, setCarDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/car");
      setCarDetails(result.data);
    };

    fetchData();
  }, []);

  return (
    <Container style={{ marginTop: "15px" }}>
      <Grid container spacing={2}>
        {carDetails.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardComponent
              image={item.thumbnail}
              title={item.carModel}
              subtitle={item.pricePerHour}
              carDetail={item}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
