module.exports = {
  env: {
    node: true,
    es6: true,
    jquery: true,
    browser: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  plugins: ["prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": ["error"],
    "no-console": "off",
    "linebreak-style": ["error", "unix"],
    quotes: ["off", "single"],
    semi: ["error", "always"],
    "react/display-name": "off",
    "react/jsx-boolean-value": 0,
    camelcase: 0,
    "import/prefer-default-export": 0,
    "no-nested-ternary": 0,
    "react/no-array-index-key": 0,
  },
  globals: {
    __PRODUCTION__: true,
    __DEV__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __BACKEND_ROOT_URL__: true,
    __PRERELEASE__: true,
    __MAINTENANCE__: "readonly",
  },
};
