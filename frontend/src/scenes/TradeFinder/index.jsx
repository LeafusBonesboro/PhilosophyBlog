import React from "react";
import { Box, Typography } from "@mui/material";

const ScenePlaceholder = ({ title }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">
        This is a placeholder for the <strong>{title}</strong> scene.
      </Typography>
    </Box>
  );
};

export default ScenePlaceholder;

