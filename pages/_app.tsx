import "../styles/reset.css";
import "../styles/variables.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import awsconfig from "../src/aws-exports";
import { Amplify, Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  CognitoHostedUIIdentityProvider,
  CognitoUser,
} from "@aws-amplify/auth";

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          console.log(`Signed in as user: ${user!.getUsername()}`);
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

const Landing = () => {
  return (
    <>
      <h1>Sign In</h1>
      <button
        onClick={() =>
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          })
        }
      >
        Sign In With Google
      </button>
    </>
  );
};

export default MyApp;
