import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider, UserContextProvider } from "./contexts";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
