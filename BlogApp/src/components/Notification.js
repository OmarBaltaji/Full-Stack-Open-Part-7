import { useNotificationValue } from "../contexts/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  if (notification === null) {
    return null;
  }

  const { message, className } = notification;

  return <div className={"feedback " + className}>{message}</div>;
};

export default Notification;
