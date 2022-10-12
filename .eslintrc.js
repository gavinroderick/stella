module.exports = {
  "extends": [
    "next/core-web-vitals", 
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@next/next/no-img-element": "off"
  },
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  plugins: ["@typescript-eslint", "react", "jest"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
 },
}