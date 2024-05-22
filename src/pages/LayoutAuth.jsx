import { Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import bg from "../assets/bg.jpg";

// Layout.jsx
export const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const style = isMobile
    ? { backgroundColor: "lightblue" }
    : { backgroundImage: `url(${bg})`, backgroundSize: "100% 100%" };
  return (
    <div style={style}>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
        }}
      >
        {children}
      </Container>
    </div>
  );
};

export default Layout;
