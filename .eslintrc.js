module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    "no-useless-constructor": "off",
    "camelcase": "off",
    "class-methods-use-this": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "_"
    }],
    "@typescript-eslint/naming-convention": ["error", {
      "selector": "interface",
      "format": ["PascalCase"],
      "custom": {
        "regex": "^I[A-Z]",
        "match": true
      }
    }],
    "import/extensions": [
    "error",
    "ignorePackages",
    {
      "ts": "never"
    },
  ]
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  }
};
