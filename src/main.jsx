import "modern-normalize/modern-normalize.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";

import App from "./App";
import { theme } from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";

function prepareMSW() {
  if (import.meta.env.DEV && import.meta.env.VITE_WITH_MSW) {
    return import("./mocks/browser").then(({ worker }) => worker.start());
  }

  return Promise.resolve();
}

const queryClient = new QueryClient();

prepareMSW().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <App />
            </RecoilRoot>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
