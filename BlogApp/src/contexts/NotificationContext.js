import { createContext, useReducer, useContext } from "react";

const NotificationReducer = (state = null, action) => {
  switch (action.type) {
    case "set":
      return { message: action.payload.message, className: action.payload.className };
    case "hide":
      return null;
    default:
      return state;
  }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, null);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
}

export const useNotify = () => {
  const valueAndDispatch = useContext(NotificationContext);
  const dispatch = valueAndDispatch[1];

  return (payload) => {
    dispatch({ type: "set", payload });
    setTimeout(() => {
      dispatch({ type: "hide" });
    }, 5000);
  }
}

export default NotificationContext;