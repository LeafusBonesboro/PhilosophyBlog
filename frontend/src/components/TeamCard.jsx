// src/components/TeamCard.jsx

import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const TeamCard = ({ team }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      backgroundColor={colors.primary[400]}
      p="20px"
      borderRadius="8px"
      m="10px"
      display="flex"
      flexDirection="column"
    >
      {/* Team Name */}
      <Typography variant="h4" sx={{ mb: "10px" }} color={colors.grey[100]}>
        {team.team_name}
      </Typography>

      {/* Players List */}
      <Typography color={colors.grey[100]}>
        <strong>Players:</strong>
      </Typography>
      <ul>
        {team.players.map((player, index) => (
          <li key={index}>
            <Typography variant="body1" color={colors.grey[100]}>
              {player}
            </Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default TeamCard;
