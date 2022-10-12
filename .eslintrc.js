module.export = {
  "extends": "next/core-web-vitals",
  "rules": {
    "@next/next/no-img-element": "off"
  },
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  plugins: ["@typescript-eslint", "react", "jest"],
}
