import "modern-normalize/modern-normalize.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@emotion/react";

import App from "./App";
import { theme } from "./styles/theme";

function prepareMSW() {
  if (process.env.NODE_ENV === 'development') {
    return import("./mocks/browser").then(({ worker }) => worker.start());
  }

  return Promise.resolve();
}

const queryClient = new QueryClient();

prepareMSW().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
