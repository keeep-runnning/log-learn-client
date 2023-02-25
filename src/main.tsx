import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import customizedTheme from "./styles/customizedTheme";
import App from "./App";

const queryClient = new QueryClient();

const root = createRoot(document.querySelector("#root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={customizedTheme}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
