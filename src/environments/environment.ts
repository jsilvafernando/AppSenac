import { firebaseconfig } from "../firebase-config";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: firebaseconfig
  // {
  //   apiKey: "AIzaSyAuzyevKEGZfBo7sfHVkKVVxp5DqwGy4as",
  //   authDomain: "senac-app-campinas.firebaseapp.com",
  //   databaseURL: "https://senac-app-campinas.firebaseio.com",
  //   projectId: "senac-app-campinas",
  //   storageBucket: "",
  //   messagingSenderId: "940230609320"
  // }
};

