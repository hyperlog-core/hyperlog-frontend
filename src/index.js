import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./tailwind.generated.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import * as Sentry from "@sentry/react";
import { setContext } from "@apollo/client/link/context";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      "https://50ef3f81d3604f56a7fff8d8f4490863@o310860.ingest.sentry.io/5338356",
  });
}

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql/`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

if (
  localStorage.getItem("expire") &&
  localStorage.getItem("expire") < Date.now()
) {
  localStorage.removeItem("expire");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <div className="h-screen">
        <App />
      </div>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
