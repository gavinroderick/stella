import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Google from "../public/google.svg";
import Image from "next/image";

const Landing: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.landingMain}>
        <div className={styles.landingCard}>
          <h1>logo</h1>
          <p>Welcome to Stella.</p>
          <p>
            A place where you can create, view and, update your Bio, or search
            through other ANDis&apos; bios
          </p>
          <button
            className={styles.signInButton}
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              })
            }
          >
            <Google />
            <span className={styles.buttonText}>Sign In With Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Landing;
