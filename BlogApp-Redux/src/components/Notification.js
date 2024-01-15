import React, { useState } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (notification === null) {
    return null;
  }

  const { message, className } = notification;

  return <div className={"feedback " + className}>{message}</div>;
};

export default Notification;
