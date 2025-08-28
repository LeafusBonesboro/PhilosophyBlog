import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import flockLogo from './flock-logo.png';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // arrow pointing left
import MovingIcon from '@mui/icons-material/Moving';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import CalculateIcon from '@mui/icons-material/Calculate';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AppsIcon from '@mui/icons-material/Apps';


// Sidebar item component
const Item = ({ title, to, icon, selected, setSelected, fontSize }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography sx={{ fontSize: fontSize || ".96rem" }}> {title} </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

// Main Sidebar component
const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          fontSize: "12px !important", 
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          fontSize: "12px !important", 
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isSidebarCollapsed} width={70}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />} // Dashboard icon
              selected={selected}
              setSelected={setSelected}
              
            />
            <Item
              title="Rankings"
              to="/Rankings"
              icon={<MovingIcon />} // My Teams icon
              selected={selected}
              setSelected={setSelected}
            />

            {/* You can add more routes as needed */}
            {/* Example of additional route */}
            <Item
              title="Prospects"
              to="/Prospects"
              icon={<TipsAndUpdatesIcon/>} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="My Teams"
              to="/myteams"
              icon={<SportsFootballIcon />} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Mock Draft"
              to="/MockDraft"
              icon={<AppsIcon/>} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Trade Finder"
              to="/TradeFinder"
              icon={<ConnectWithoutContactIcon />} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calculator"
              to="/Calculator"
              icon={<CalculateIcon />} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Comparison"
              to="/Comparison"
              icon={<SocialDistanceIcon/>} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Range of Outcomes "
              to="/RangeofOutcomes"
              icon={<CompareArrowsIcon />} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Reviews"
              to="/MyReviews"
              icon={<LiveHelpIcon/>} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Draft Guide"
              to="/DraftGuide"
              icon={<RssFeedIcon />} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Account"
              to="/LoginPage"
              icon={<AccountCircleIcon />} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Subscribe"
              to="/Subscribe"
              icon={<LockPersonIcon />} // You can change to another icon
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

