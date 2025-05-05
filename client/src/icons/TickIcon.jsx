import React from "react";

const TickIcon = ({ classes, pathClasses }) => {
  return (
    <svg
      className={classes}
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathClasses}
        d="M17.25 1.21866L5.68738 12.7813L0.75 7.84389"
        stroke="#909090"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TickIcon;
