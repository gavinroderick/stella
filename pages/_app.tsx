import "../styles/reset.css";
import "../styles/variables.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import { CognitoUser } from "@aws-amplify/auth";
import Landing from "./landing";
import { configureAuth } from "../src/auth/auth.helpers";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<CognitoUser | null>(null);

  configureAuth();
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
      }
    });
    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  return <>{user ? <Component {...pageProps} /> : <Landing />}</>;
}

export default MyApp;
