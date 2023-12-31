import React from "react";

function SideBarLightIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="92"
      height="56"
      fill="none"
      viewBox="0 0 92 56"
      {...props}
    >
      <rect
        width="90.5"
        height="54.5"
        x="0.75"
        y="0.75"
        stroke={props.strokeColor ? props.strokeColor : "#D3D7DA"}
        strokeWidth="1.5"
        rx="5.25"
      ></rect>
      <rect
        width="52"
        height="44"
        x="6"
        y="6"
        fill={props.strokeColor ? props.strokeColor : "#D3D7DA"}
        rx="2"
      ></rect>
      <rect
        width="24"
        height="20"
        x="62"
        y="6"
        fill={props.strokeColor ? props.strokeColor : "#D3D7DA"}
        rx="2"
      ></rect>
      <rect
        width="24"
        height="20"
        x="62"
        y="30"
        fill={props.strokeColor ? props.strokeColor : "#D3D7DA"}
        rx="2"
      ></rect>
      <path
        fill={props.pathColor ? props.pathColor : "#8896A4"}
        d="M25 31.889v2.333c0 .43.336.778.75.778h10.5c.414 0 .75-.348.75-.778V31.89c0-1.718-1.343-3.111-3-3.111h-6c-1.657 0-3 1.393-3 3.11zm9-7.778c0 1.718-1.343 3.111-3 3.111s-3-1.393-3-3.11C28 22.391 29.343 21 31 21s3 1.393 3 3.111zM71 18.222v1.334c0 .245.196.444.438.444h6.124a.441.441 0 00.438-.444v-1.334c0-.982-.784-1.778-1.75-1.778h-3.5c-.966 0-1.75.796-1.75 1.778zm5.25-4.444c0 .982-.784 1.778-1.75 1.778s-1.75-.796-1.75-1.778S73.534 12 74.5 12s1.75.796 1.75 1.778zM71 42.222v1.334c0 .245.196.444.438.444h6.124a.441.441 0 00.438-.444v-1.334c0-.982-.784-1.778-1.75-1.778h-3.5c-.966 0-1.75.796-1.75 1.778zm5.25-4.444c0 .982-.784 1.778-1.75 1.778s-1.75-.796-1.75-1.778S73.534 36 74.5 36s1.75.796 1.75 1.778z"
      ></path>
    </svg>
  );
}

export default SideBarLightIcon;
