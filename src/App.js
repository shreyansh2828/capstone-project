import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navigation from "./pages/Navigation";
import Profile from "./pages/Profile";
import Home from "./components/Home.component";
import MyBookings from "./components/MyBookings.component";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { SnackbarProvider } from './components/SnackbarContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  // Your theme configuration here
});
function App() {
  return (
    <ThemeProvider theme={theme}>
    <SnackbarProvider>
    <Router>
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", justifyContent: "space-between", padding: "15px" }}>
        
      <div>
        <Link  to="/">RentWheelz</Link>
      </div>
      {/* <div>
        <Link to="/home">hhhh</Link>
      </div> */}
      <Navigation />

      
        </div>
      </header>
      {/* Add your routes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
    </Router>
    </SnackbarProvider>
     </ThemeProvider>
  );
}

export default App;
