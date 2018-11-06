module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['react', 'flowtype', 'jsx-a11y', 'import'],
  env: {
    jest: true,
  },
  globals: {
    fetch: false,
  },
  rules: {
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': [2, { ignorePureComponents: true }],
    'react/forbid-prop-types': [0, { forbid: [] }],
    'react/destructuring-assignment': 0,
    'react/require-default-props': 0,
    'react/prop-types': 'off',
    'react/jsx-wrap-multilines': [1, { prop: 'ignore' }],
    'import/extensions': [1, 'never', { svg: 'always' }],
    'import/first': 1,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'flowtype/require-valid-file-annotation': 0,
    'flowtype/no-types-missing-file-annotation': 0,
  },
};
