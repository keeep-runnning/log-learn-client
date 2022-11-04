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
import { ChakraProvider } from "@chakra-ui/react";
import customizedTheme from "./styles/customizedTheme";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ChakraProvider theme={customizedTheme}>
              <App />
            </ChakraProvider>
          </RecoilRoot>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
