import React from "react";

const MuteSign = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        minWidth: 30,
        maxWidth: 50,
      }}
    >
      <line
        x1="0"
        y1="0"
        x2="100"
        y2="100"
        vectorEffect="non-scaling-stroke"
        stroke="#0077f2"
        strokeWidth="3"
      />
    </svg>
  );
};

export default MuteSign;
