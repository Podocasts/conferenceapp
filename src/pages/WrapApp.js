import { Box, Button } from "@material-ui/core";
import { useRef, useState } from "react";
import MainContainer from "./MainContainer";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const WrapApp = () => {
  const [mode, setMode] = useState();
  const [meetingID, setMeetingID] = useState();
  const [recordingFlg, setRecordingFlg] = useState();
  const navigate = useNavigate();

  const ref = useRef("");
  const handleClick = (key) => {
    setMode(key);
  };
  const handleClick4 = () => {
    navigate("/dashboard");
  };
  const handleClick2 = () => {
    !ref?.current
      ? alert("Please enter meeting ID")
      : setMeetingID(ref.current);
  };
  const handleClick3 = (flag) => {
    setRecordingFlg(flag);
  };
  const handleChange = (e) => {
    ref.current = e.target.value;
  };
  return mode && meetingID ? (
    <MainContainer
      mode={mode}
      meetingID={meetingID}
      recordingFlg={recordingFlg}
    />
  ) : (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "radial-gradient(circle, #012, #000 55em)",
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto",
        gap: "30px",
        position: "relative",
      }}
    >
      <Button
        variant="outlined"
        style={{
          color: "white",
          fontSize: "20px",
          padding: "10px 20px",
          position: "absolute",
          right: "20px",
          top: "30px",
        }}
        onClick={handleClick4}
      >
        Go to Storage Dashboard
      </Button>
      <img src={Logo} className="blur-border" />
      <h2 className="animation">Amuse Live Stream App</h2>
      {mode && !meetingID ? (
        mode === "VIEWER" || (mode === "CONFERENCE" && recordingFlg) ? (
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
            <input
              placeholder="Enter Meeting ID"
              ref={ref}
              onChange={handleChange}
              style={{
                background: "none",
                border: "1px solid rgba(255, 255, 255, 0.23)",
                padding: "15px",
                fontSize: "20px",
                color: "white",
                outline: "none",
                borderRadius: "4px",
                textAlign: "center",
              }}
            />

            <Button
              variant="outlined"
              style={{ color: "white", fontSize: "20px", padding: "10px" }}
              onClick={handleClick2}
            >
              Join
            </Button>
          </Box>
        ) : (
          <>
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
                onClick={() => handleClick3(1)}
              >
                Join with Creator
              </Button>
              <Button
                variant="outlined"
                style={{ color: "white", fontSize: "20px", padding: "10px" }}
                onClick={() => handleClick3(2)}
              >
                Join with Friends
              </Button>
            </Box>
          </>
        )
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

export default WrapApp;
