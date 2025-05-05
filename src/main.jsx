import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </QueryClientProvider>
);
