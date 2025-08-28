import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const AllTeams = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    // Replace the URL with your actual backend URL
    fetch('https://ffopt-render.onrender.com/teams/all_teams')
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
      })
      .catch((error) => console.error('Error fetching all teams:', error));
  }, []);

  if (!teamData) return <p>Loading...</p>;

  return (
    <>
      {teamData.map((team, index) => (
        <Box
          key={index}
          backgroundColor="#2C2C2C"
          p={2}
          m={1}
          borderRadius="8px"
          color="white"
        >
          <h3>{team.team_name}</h3>
          <ul>
            {team.players.map((player, playerIndex) => (
              <li key={playerIndex}>
                {player.name} - {player.position}
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </>
  );
};

export default AllTeams;
