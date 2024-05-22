import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";

import { baseApiUrl, thumbnailPath } from "../Constant";
import { v4 as uuidv4 } from "uuid";

import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import useInput from "../hooks/useInput";
import { useContext } from "react";
import { SnackbarContext } from "../components/SnackbarContext";

const CardComponent = ({
  image = "",
  title = "",
  subtitle = "",
  carDetail = {},
}) => {
  const theme = useTheme();
  const openSnackbar = useContext(SnackbarContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const modalStyle = isMobile
    ? { width: "75%", height: "85%" }
    : { width: "30%", height: "60%" };

  const [open, setOpen] = useState(false);
  const {
    value: fromDate,
    bind: bindFromDate,
    reset: resetFromDate,
  } = useInput("");
  const { value: toDate, bind: bindToDate, reset: resetToDate } = useInput("");
  const {
    value: passenger,
    bind: bindPassenger,
    reset: resetPassenger,
  } = useInput("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReserve = async () => {
    console.log({ carDetail });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (!fromDate || !toDate) {
      openSnackbar("from and to date is mandatory!", "error");
      return;
    }

    if (from < today) {
      openSnackbar("From date should be today or greater!", "error");
      return;
    }

    if (to < from) {
      openSnackbar(
        "To date should be equal or greater than From date",
        "error"
      );
      return;
    }

    if (passenger <= 0) {
      openSnackbar("Passenger count should be greater than 0!", "error");
      return;
    }

    if (carDetail.carAvailability === "Not Available") {
      openSnackbar(`${carDetail.carModel} is not Available !`, "error");
      resetFromDate();
      resetToDate();
      resetPassenger();
      return;
    }

    // console.log(
    //   `From Date: ${fromDate}, To Date: ${toDate}, Passenger: ${passenger}`
    // );
    const NoOfdays =
      1 +
      Math.ceil(
        (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)
      );
    console.log(NoOfdays);

    try {
      const userID = JSON.parse(sessionStorage.getItem("userData"));
      console.log(userID);

      const reservationResponse = await fetch(
        "http://localhost:5000/reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: uuidv4(),
            user: userID.proofId,
            car: carDetail.id,
            reservationDate: new Date().toISOString().split("T")[0],
            pickupDate: fromDate,
            returnDate: toDate,
            numOfTravellers: passenger,
            status: "success",
            total: carDetail.pricePerHour * NoOfdays,
          }),
        }
      );

      if (reservationResponse.ok) {
        // API call successful, handle the reservationResponse here
        const data = await reservationResponse.json();
        console.log(data);
        openSnackbar("Reservation successful!", "success");
        setOpen(false);
      } else {
        // API call failed, handle the error here
        const error = await reservationResponse.json();
        openSnackbar(error, "error");
        return false;
      }
    } catch (error) {
      // Handle any network or other errors here
      console.error(error);
    }

    resetFromDate();
    resetToDate();
    resetPassenger();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={baseApiUrl + thumbnailPath + image}
        alt={title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `${baseApiUrl}/assets/cars/defaultCar.jpg`;
        }}
      />
      <CardContent style={{ padding: "0px 5px" }}>
        <Typography align="left" variant="h6">
          {title}
        </Typography>
        <Typography align="left" variant="subtitle1">
          Rs. {subtitle}/hour
        </Typography>
        <Button
          style={{
            display: "flex",
            outline: "none",
            color: "#7d2e0d",
            fontWeight: "bold",
            padding: "5px 0px",
          }}
          onClick={handleOpen}
        >
          RESERVE
        </Button>
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
            <Typography variant="h6">Reserve {title}</Typography>
            <TextField
              value={fromDate}
              {...bindFromDate}
              fullWidth
              type="date"
              label="Pickup Date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              value={toDate}
              {...bindToDate}
              type="date"
              fullWidth
              label="Return Date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              value={passenger}
              {...bindPassenger}
              type="number"
              fullWidth
              label="Passengers"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box sx={{ display: "flex", gap: "1em" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleReserve}
              >
                Reserve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
