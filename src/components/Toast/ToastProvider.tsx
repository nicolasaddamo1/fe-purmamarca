"use client";

import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = (): React.ReactElement => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
      toastStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        backgroundColor: "#363535",
        color: "#ffffff",
        borderRadius: "4px",
        padding: "8px 10px",
        fontFamily: "var(--font-abeezee), sans-serif",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.164)",
      }}
    />
  );
};

export default ToastProvider;
