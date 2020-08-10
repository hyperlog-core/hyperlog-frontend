import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./tailwind.generated.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";
import * as Sentry from "@sentry/react";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      "https://50ef3f81d3604f56a7fff8d8f4490863@o310860.ingest.sentry.io/5338356",
  });
}

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql/`,
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `JWT ${token}` : "",
      },
    });
  },
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
    <RecoilRoot>
      <React.StrictMode>
        <div className="h-screen">
          <App />
        </div>
      </React.StrictMode>
    </RecoilRoot>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
