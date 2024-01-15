import { createContext, useContext, useReducer } from "react";
import loginService from "../services/login";

const userReducer = (state, action) => {
  switch (action.type) {
    case "set":
      localStorage.setItem("loggedUserInfo", JSON.stringify(action.payload));
      return action.payload;
    case "remove":
      localStorage.removeItem("loggedUserInfo");
      return action.payload;
    default:
      return state;
  }
}

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const [user] = useContext(UserContext);
  if (!user) {
    const loggedUserInfo = localStorage.getItem("loggedUserInfo");
    return loggedUserInfo ? JSON.parse(loggedUserInfo) : null;
  }
  return user;
}

export const useUserDispatch = () => {
  const valueAndDispatch = useContext(UserContext);
  const dispatch = valueAndDispatch[1];

  return async (payload) => {
    let user = null;
    if (payload?.credentials) {
      user = await loginService.login(payload.credentials);
    }
    dispatch({ type: payload.type, payload: user});
  }
}