import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { NextPage } from "next";

const Landing: NextPage = () => {
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

export default Landing;
