import { Box, Button, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import MyTeam from '../../components/MyTeam';  
import AllTeams from '../../components/AllTeams';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" />
      
      
      </Box>


     

      {/* GRID LAYOUT: 1 Column with 11 Rows */}
      <Box
        display="grid"
        gridTemplateColumns="1fr"  // 1-column layout
        gridAutoRows="minmax(100px, auto)"  // Ensures flexible row height
        gap="20px"  // Space between rows
      >
        {/* Top empty box */}
        <Box
          backgroundColor={colors.primary[400]}
          p={2}
          minHeight="100px"  // Ensure it takes some space
        >
          {/* Leave this box empty */}
        </Box>

        {/* All Teams Box */}
        <Box
          backgroundColor={colors.primary[400]}
          p={2}
          overflow="auto"  // Allow scroll if content overflows
        >
          <AllTeams />  {/* Render all teams here */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
