import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { apolloClient } from "./apollo/client";
import { FavoritesApp } from "./favorites-app";
import "./style.css";

const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error("Root element #app was not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <FavoritesApp />
    </ApolloProvider>
  </StrictMode>,
);
