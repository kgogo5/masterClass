import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import Container from "./Container";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Container>
        <App />
      </Container>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
