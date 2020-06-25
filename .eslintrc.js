module.exports = {
  env: {
    es2020: true,
    node: true,
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
    "camelcase": "off",
    "class-methods-use-this": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "_"
    }],
    "import/extensions": [
    "error",
    "ignorePackages",
    {
      "ts": "never"
    }
  ]
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  }
};
