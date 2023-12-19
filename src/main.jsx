import ReactDOM from "react-dom/client";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import App from "./App.tsx";
import "./index.css";
import { ApiProvider } from "./hooks/auth/index.tsx";
import { AuthProvider } from "./hooks/wrQuery/index.tsx";
axios.defaults.withCredentials = true;
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ApiProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ApiProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
