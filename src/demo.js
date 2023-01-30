import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress, {
  circularProgressClasses
} from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function SimpleBackdrop(props) {
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [openPage, setOpenPage] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    toggle();
    setOpen(true);
  };

  function toggle() {
    setIsActive(true);
  }

  useEffect(() => {
    function reset() {
      setSeconds(5);
      setIsActive(false);
    }
    let interval = 5;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (isActive && seconds <= -1) {
        handleToggle();
        handleClose();
        setOpenPage(true);
        reset();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div>
      {!openPage ? (
        <div>
          <Button onClick={handleToggle}>Show backdrop</Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <Box sx={{ position: "relative" }}>
              <CircularProgress
                variant="determinate"
                sx={{
                  color: (theme) =>
                    theme.palette.grey[
                      theme.palette.mode === "light" ? 200 : 800
                    ]
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
              />
              <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
                  animationDuration: "550ms",
                  position: "absolute",
                  left: 0,
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: "round"
                  }
                }}
                size={40}
                thickness={4}
                {...props}
              />
            </Box>
          </Backdrop>
        </div>
      ) : (
        <div>
          <h1>DONE BOSS</h1>
        </div>
      )}
    </div>
  );
}
