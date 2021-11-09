import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/styles.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
