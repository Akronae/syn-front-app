module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    `eslint:recommended`,
    `plugin:react/recommended`,
    `plugin:@typescript-eslint/recommended`,
  ],
  overrides: [],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: `latest`,
    sourceType: `module`,
  },
  plugins: [`react`, `@typescript-eslint`, `unused-imports`],
  rules: {
    indent: [`error`, 2],
    'linebreak-style': [`error`, `unix`],
    'jsx-quotes': [`error`, `prefer-single`],
    quotes: [`error`, `backtick`],
    '@typescript-eslint/quotes': [`error`, `backtick`],
    semi: [`error`, `never`],
    'unused-imports/no-unused-imports': `error`,
    'prefer-template': `error`,
    // not required since react 17
    'react/react-in-jsx-scope': `off`,
    // typescript is handling this
    'react/prop-types': `off`,
    '@typescript-eslint/no-unused-vars': [
      `error`,
      { vars: `all`, args: `none` },
    ],
    '@typescript-eslint/no-explicit-any': `off`,
  },
  ignorePatterns: [`node_modules`, `dist`, `build`, `*.d.ts`],
}
