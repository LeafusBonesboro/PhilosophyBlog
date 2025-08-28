import React, { useState, useEffect } from 'react';

const MyTeam = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    // Fetch the "My Team" data from Flask API
    fetch('https://ffopt-render.onrender.com/teams/my_team')
      .then(response => response.json())
      .then(data => {
        setTeamData(data);
      })
      .catch(error => console.error('Error fetching team data:', error));
  }, []);

  if (!teamData) return <p>Loading...</p>;

  return (
    <div>
      <h1>My Team</h1>
      <ul>
        {teamData.map((team) => (
          <li key={team.team_name}>
            {team.team_name}: {team.players.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTeam;
