import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Chip } from "@mui/material";

export default function PlayerCard({ number, name, imageUrl, position, ranking }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      {/* Top bar with number and name */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "grey.100",
          px: 2,
          py: 1,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {number}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "medium" }} noWrap>
          {name}
        </Typography>
      </Box>

      {/* Player image */}
      <CardMedia component="img" height="180" image={imageUrl} alt={name} />

      {/* Bottom content with position + rank */}
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Chip label={`Position: ${position}`} variant="outlined" />
        <Chip label={`Rank: ${ranking}`} color="primary" />
      </CardContent>
    </Card>
  );
}
