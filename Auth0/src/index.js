import React from "react";
import ReactDOM from "react-dom";

import { Auth0Provider } from "@auth0/auth0-react";

import Main from "./components/main";
import ThemeContext from "./contexts/themecontext";

ReactDOM.render(
  <Auth0Provider
    domain="dev-kh0kk0o1.auth0.com"
    clientId="8A0VMBTtg5xZ7iAPypNCWIk5nwCgW7E7"
    redirectUri={window.location.origin}
  >
    <ThemeContext.Provider value="light">
      <Main />
    </ThemeContext.Provider>
  </Auth0Provider>,
  document.getElementById("root")
);
