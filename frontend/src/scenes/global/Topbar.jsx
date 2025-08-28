import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import flockLogo from './flock-logo.png';
import { useLocation } from "react-router-dom";

const Topbar = ({ isSidebarCollapsed, setIsSidebarCollapsed, onLogin, sidebarWidth = 250 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();

  // Map routes to titles
  const routeTitles = {
    "/": "Dashboard",
    "/Rankings": "Rankings",
    "/Prospects": "Prospects",
    "/myteams": "My Teams",
    "/MockDraft": "Mock Draft",
    "/TradeFinder": "Trade Finder",
    "/Calculator": "Calculator",
    "/Comparison": "Comparison",
    "/RangeOfOutcomes": "Range of Outcomes",
    "/MyReviews": "My Reviews",
    "/DraftGuide": "Draft Guide",
    "/MyAccount": "My Account",
    "/Subscribe": "Subscribe",
    "/LoginPage": "Login",
    "/RegisterPage": "Register",
    "/LandingPage": "Landing",
    "/NotFound": "Not Found"
  };

  const pageTitle = routeTitles[location.pathname] || "";

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
      
      {/* Left section: logo + sidebar toggle */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
          {isSidebarCollapsed ? <MenuOutlinedIcon /> : <ChevronLeftIcon />}
        </IconButton>
        <img
          src={flockLogo}
          alt="The Flock Logo"
          style={{ height: 40, width: "auto", marginLeft: 8 }}
        />
      </Box>

      {/* Page title aligned outside sidebar */}
      {pageTitle && (
  <Typography
    variant="h4" // larger font
    color="#b5651d" // brownish-orange
    sx={{
      position: "absolute",
      left: 210, // fixed start position
      fontWeight: 700,
    }}
  >
    {pageTitle}
  </Typography>
)}
      

      {/* Right section: icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={onLogin}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
