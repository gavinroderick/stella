import awsConfig from "../aws-exports";
import { Amplify } from "aws-amplify";

/**
 * Inferred type of the generated config from Amplify CLI.
 */
type AwsConfig = typeof awsConfig;

/**
 * Helper function to determine if the branch being used is a feature branch.
 * @returns true if the environment begins with feat, otherwise returns false
 */
const isFeatureBranch = (): boolean => {
  const env = process.env.NEXT_PUBLIC_AMPLIFY_ENV;
  if (env === undefined) return false;
  return env.startsWith("feat");
};

/**
 * Configures authorization for the app.
 *
 * @remarks Currently utilises the \@aws-amplify/auth npm library,
 * specifially the federated sign-in with Google
 */
const configureAuth = (): void => {
  const environmentSpecificConfig = configureRedirectUris(awsConfig);
  Amplify.configure(environmentSpecificConfig);
};

/**
 * Configures which redirect URI to use based on the NEXT_PUBLIC_AMPLIFY_ENV variable.
 *
 * @param awsconfig - The configuration generated by the Amplify CLI.
 * @returns - An updated config with only one value per redirect URI
 */
const configureRedirectUris = (conf: AwsConfig): AwsConfig => {
  const env = process.env.NEXT_PUBLIC_AMPLIFY_ENV;
  switch (env) {
    case "localhost":
      return replaceRedirectUris(conf, "http://localhost:3000/");
    case "main":
      return replaceRedirectUris(
        conf,
        "https://main.d1gxsd80k5g5cl.amplifyapp.com/"
      );

    default:
      return replaceRedirectUris(
        conf,
        `https://${env}.d1gxsd80k5g5cl.amplifyapp.com/`
      );
  }
};

/**
 * Replaces the oauth.redirectSignIn and oauth.redirectSignOut properties with the provided URI
 *
 * @param config - The aws config generated by AWS Amplify CLI
 * @param newUri - The string URI of that is to replace one or more existing URIs in the config
 * @returns - An updated awsConfig object with updated redirectSignIn and redirectSignOut properties
 */
const replaceRedirectUris = (config: AwsConfig, newUri: string): AwsConfig => {
  const newConfig: AwsConfig = {
    ...config,
    oauth: {
      ...config.oauth,
      redirectSignIn: newUri,
      redirectSignOut: newUri,
    },
  };
  return newConfig;
};

export { configureAuth, isFeatureBranch };
