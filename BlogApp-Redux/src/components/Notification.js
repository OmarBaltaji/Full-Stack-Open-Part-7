import React, { useState } from "react";

const Notification = () => {
  const [notification, setNotification] = useState(null);

  if (notification === null) {
    return null;
  }

  const { message, className } = notification;

  return <div className={"feedback " + className}>{message}</div>;
};

export default Notification;
