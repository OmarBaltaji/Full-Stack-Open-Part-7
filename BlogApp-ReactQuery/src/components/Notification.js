import { useNotificationValue } from "../contexts/NotificationContext";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useNotificationValue();

  if (notification === null) {
    return null;
  }

  const { message, className } = notification;

  return <Alert variant={className}>{message}</Alert>;
};

export default Notification;
