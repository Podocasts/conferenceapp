import * as React from "react";

const ParticipantRemoveIcon = (props) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.25 8.497c0 .553.45 1 1.003.997l6.525-.039a.977.977 0 0 0-.005-1.955H5.247a.997.997 0 0 0-.997.997ZM8.5 17a8.224 8.224 0 0 1-3.294-.67 8.62 8.62 0 0 1-2.71-1.827 8.622 8.622 0 0 1-1.827-2.71A8.225 8.225 0 0 1 0 8.5c0-1.176.223-2.28.67-3.315a8.495 8.495 0 0 1 1.827-2.699A8.713 8.713 0 0 1 5.207.67 8.225 8.225 0 0 1 8.5 0c1.176 0 2.28.223 3.315.67a8.584 8.584 0 0 1 2.699 1.816 8.583 8.583 0 0 1 1.817 2.699C16.777 6.219 17 7.325 17 8.5c0 1.162-.223 2.26-.67 3.294a8.713 8.713 0 0 1-1.816 2.71 8.494 8.494 0 0 1-2.699 1.827A8.276 8.276 0 0 1 8.5 17Z"
      fill={props.fillColor}
    />
  </svg>
);

export default ParticipantRemoveIcon;
