// src/scenes/myteams/MyTeams.jsx

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const MyTeams = () => {
  const [teamData, setTeamData] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Access env variable

  useEffect(() => {
    fetch(`${API_BASE_URL}/teams/my_team`) // Assuming '/my_team' is the endpoint for the user's team
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
      })
      .catch((error) => console.error('Error fetching my team:', error));
  }, [API_BASE_URL]);

  if (!teamData) return <p>Loading...</p>;

  return (
    <Box m="20px">
      <h1>My Team</h1>
      <Box backgroundColor="#2C2C2C" p={2} m={1} borderRadius="8px" color="white">
        <h3>{teamData.team_name}</h3>
        <ul>
          {teamData.players.map((player, index) => (
            <li key={index}>
              {player.name} - {player.position}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default MyTeams;
