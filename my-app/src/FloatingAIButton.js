import React from "react";
import { Fab, Tooltip } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const FloatingAIButton = () => {
 const handleClick = () => {
  window.open("https://ai-finance-analyst-by-sidseth.vercel.app/", "_blank");
};


  return (
    <Tooltip title="Analyze stocks using AI" placement="top">
      <Fab
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          background: "linear-gradient(135deg, #6e27d5, #3b82f6)",
          color: "#fff",
          boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
          fontWeight: "bold",
          fontSize: "0.9rem",
          width: 72,
          height: 72,
          '&:hover': {
            background: "linear-gradient(135deg, #3b82f6, #6e27d5)",
            boxShadow: "0 6px 40px rgba(0,0,0,0.4)"
          }
        }}
      >
        <RocketLaunchIcon fontSize="large" />
      </Fab>
    </Tooltip>
  );
};

export default FloatingAIButton;
