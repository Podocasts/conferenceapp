import { Box, Button } from "@material-ui/core";
import { useState } from "react";
import App from "./App";
import Logo from "./assets/logo.png";
const WrapApp = () => {
  const [mode, setMode] = useState();
  const handleClick = (key) => {
    setMode(key);
  };
  return mode ? (
    <App mode={mode} />
  ) : (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "radial-gradient(circle, #012, #000 55em)",
        backgroundColor: "#000",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <img src={Logo} className="blur-border" />
      <h2 className="animation">aMuse Live Stream App</h2>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minWidth: "300px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          style={{ color: "white", fontSize: "20px", padding: "10px" }}
          onClick={() => handleClick("CONFERENCE")}
        >
          Join with Admin
        </Button>
        <Button
          variant="outlined"
          style={{ color: "white", fontSize: "20px", padding: "10px" }}
          onClick={() => handleClick("VIEWER")}
        >
          Join with Viewer
        </Button>
      </Box>
    </Box>
  );
};

export default WrapApp;
