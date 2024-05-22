import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setAnchorEl(null);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userData");
    navigate("/login");
  };

  const style = { cursor: "pointer", fontWeight: "bold" };

  return (
    <nav>
      {!isLoggedIn && location.pathname !== "/login" && (
        <div>
          <Link style={style} to="/login">
            Login
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <Link style={style} to="/bookings">
              My Bookings
            </Link>
          </div>

          {/* <div onClick={handleLogout} style={style}>
          Logout/ Shreyansh 
        </div> */}
          <IconButton
            style={{ width: "7px", height: "7px" }}
            onClick={handleMenuOpen}
          >
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link style={{ fontWeight: "normal" }} to="/profile">
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            {/* <MenuItem onClick={handleMenuClose}>Logout</MenuItem> */}
          </Menu>
        </div>
      )}

      {!isLoggedIn &&
        location.pathname !== "/register" &&
        location.pathname !== "/" && (
          <div>
            <Link style={style} to="/register">
              Register
            </Link>
          </div>
        )}
    </nav>
  );
};

export default Navigation;
