module.exports =
{
    extends: ['eslint:recommended'],
    root: true,
    parser: 'babel-eslint',
    parserOptions:
    {
        ecmaVersion: 6,
        ecmaFeatures:
        {
          experimentalObjectRestSpread: true,
          jsx: true
        },
        sourceType: 'module'
    },

    env:
    {
        browser: true,
        amd: true,
        es6: true,
    },

    // required to lint *.vue files
    plugins:
    [
        'html',
    ],

    // add your custom rules here
    rules:
    {
        // allow debugger during development
        'no-debugger': process.env.BUILD_TYPE === 'production' ? 'error' : 'off',
        'no-undef': 'error',
        'no-unused-vars': 0,
        'newline-before-return': 'off',
        'brace-style': ['off', 'allman', { allowSingleLine: true }],
        'indent': ['off', 4],
        'quotes': ['warn', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
        'no-console': 0,
        'valid-typeof': 0,
        'no-empty': 'warn',
        'no-unreachable': 0,
        'no-unexpected-multiline': 0,
        'no-constant-condition': 0,
    },

    globals:
    {
        cordova: 'readonly',
        process: 'readonly',
        modules: 'readonly',
        device: 'readonly',
        app: 'readonly',
        h: 'readonly',
        __BUILD_DATE__: 'readonly',
        __BUILD_NUMBER__: 'readonly',
        __APP_NAME__: 'readonly',
        __APP_ID__: 'readonly',
    }
}