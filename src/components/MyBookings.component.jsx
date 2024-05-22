import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { baseApiUrl, thumbnailPath } from "../Constant";
import { Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SnackbarContext } from "../components/SnackbarContext";
import { useContext } from "react";

const MyBookings = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const openSnackbar = useContext(SnackbarContext);
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [reservationDetails, setReservationDetails] = useState([]);
  const [cars, setCars] = useState({});

  const modalStyle = isMobile
    ? { width: "35%", height: "25%" }
    : { width: "20%", height: "20%" };

  useEffect(() => {
    const fetchCars = async () => {
      const response = await axios.get("http://localhost:5000/car");
      const cars = response.data.reduce((obj, car) => {
        obj[car.id] = car;
        return obj;
      }, {});
      setCars(cars);
    };

    fetchCars();
  }, []);
  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await axios("http://localhost:5000/reservation");
    //   //setReservationDetails whose userId is equal to the userId stored in the session storage
    //   setReservationDetails(result.data);
    // };
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/reservation");
      const userId = JSON.parse(sessionStorage.getItem("userData"));
      const filteredData = result.data.filter(
        (reservation) => reservation.user === userId.proofId
      );
      console.log({ userId });
      console.log({ reservationDetails });
      console.log({ filteredData });
      setReservationDetails(filteredData);
    };

    fetchData();
  }, []);
  const [tab, setTab] = useState(0);
  const handleCancel = () => {
    setOpen(false);
  };
  // const [modalData, setModalData] = useState(null);
  const handleOpen = (reservation) => {
    console.log({ reservation });
    //reservation.bookingId store in local storage
    localStorage.setItem("bookingId", reservation.id);

    setOpen(true);
  };

  // make patch call to update the status of the reservation by bookingId
  // get BookingId from local storage
  const id = localStorage.getItem("bookingId");
  const updateReservationStatus = async () => {
    try {
      await axios.patch(`http://localhost:5000/reservation/${id}`, {
        status: "cancelled",
      });
      // Show success snackbar
      openSnackbar("Reservation cancelled successfully");
      // update reservationDetails state here to reflect the changes

      //     data is updated correctly but backgroundColor is not changed for button on ui
      setReservationDetails(
        reservationDetails.map((reservation) => {
          if (reservation.id === id) {
            return {
              ...reservation,
              status: "cancelled",
            };
          }
          return reservation;
        })
      );
      localStorage.removeItem("bookingId");
    } catch (error) {
      // Show error snackbar
      openSnackbar("Failed to cancel reservation", "error");
    }
  };

  const handleCancelRide = async () => {
    // Call the function to update the reservation status
    await updateReservationStatus();
    // Close the modal
    handleClose();
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  reservationDetails.forEach((reservation) => {
    const carDetails = cars[reservation.id];
    reservation.carDetails = carDetails;
  });

  reservationDetails.forEach(async (reservation) => {
    // reservation.carDetails = carDetails which matches with reservation.car;
    const carDetails = cars[reservation.car];
    reservation.carDetails = carDetails;
  });

  const filteredReservations = reservationDetails.filter((reservation) => {
    switch (tab) {
      case 1:
        return reservation.status.toLowerCase() === "success";
      case 2:
        return reservation.status.toLowerCase() === "completed";
      case 3:
        return reservation.status.toLowerCase() === "cancelled";
      case 4:
        return reservation.status.toLowerCase() === "pending";
      default:
        return true;
    }
  });

  return (
    <div>
      <h1>My Bookings</h1>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        centered={isLargeScreen}
        variant={isLargeScreen ? "standard" : "scrollable"}
        scrollButtons="auto"
      >
        <Tab label="All" />
        <Tab label="Confirmed" />
        <Tab label="Completed" />
        <Tab label="Cancelled" />
        <Tab label="Pending" />
      </Tabs>
      {filteredReservations.length > 0 ? (
        <Box sx={{ padding: "1em" }}>
          <Grid container spacing={2}>
            {filteredReservations.map((reservation) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={
                  filteredReservations.length === 2 ? 6 : isLargeScreen ? 4 : 6
                }
                key={reservation.id}
              >
                {" "}
                <Card>
                  <Grid container>
                    <Grid item xs={5}>
                      <CardContent style={{ textAlign: "left" }}>
                        <Typography variant="h5" component="div">
                          {reservation.carDetails.carModel}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {reservation.description}
                        </Typography>
                        <p
                          style={{
                            fontSize: "9px",
                            margin: "0px 0px 5px 0px",
                          }}
                        >
                          From {reservation.pickupDate} to{" "}
                          {reservation.returnDate}
                        </p>
                        <p
                          style={{
                            fontSize: "10px",
                            margin: "0px 0px 5px 0px",
                          }}
                        >
                          TOTAL: Rs. {reservation.total}
                        </p>
                        <p
                          style={{
                            display: "flex",
                            outline: "none",
                            color:
                              reservation.status.toLowerCase() === "success"
                                ? "#2e7d32"
                                : reservation.status.toLowerCase() ===
                                  "completed"
                                ? "#1976d2"
                                : "red",
                            padding: "5px 0px",
                            fontSize: "12px",
                            margin: "0px 0px 5px 0px",
                          }}
                          onClick={() => {
                            console.log("RESERVE button clicked");
                          }}
                        >
                          {reservation.status.toLowerCase() === "success"
                            ? "CONFIRMED"
                            : reservation.status.toUpperCase()}
                        </p>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor:
                              reservation.status.toLowerCase() === "success"
                                ? "#f2ce34"
                                : "b2b2b2",
                            color:
                              reservation.status.toLowerCase() === "success"
                                ? "#black"
                                : "grey",
                          }}
                          disabled={
                            reservation.status.toLowerCase() !== "success"
                          }
                          onClick={() => handleOpen(reservation)}
                        >
                          Cancel Ride
                        </Button>
                      </CardContent>
                    </Grid>
                    <Grid item xs={7}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          baseApiUrl +
                          thumbnailPath +
                          reservation.carDetails.thumbnail
                        }
                        alt={reservation.carDetails}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${baseApiUrl}/assets/cars/defaultCar.jpg`;
                        }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                backgroundColor: "white",
                padding: "1em",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1em",
                ...modalStyle,
              }}
            >
              <Typography variant="h6">Are you sure?</Typography>

              <Box sx={{ display: "flex", gap: "1em" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCancelRide}
                >
                  YES
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
                >
                  NO
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      ) : (
        <Typography variant="h6" component="div">
          <br></br>
          No data available for this tab.
        </Typography>
      )}
    </div>
  );
};

export default MyBookings;
