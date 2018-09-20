module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['react', 'flowtype', 'jsx-a11y', 'import'],
  env: {
    jest: true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': [2, { ignorePureComponents: true }],
    'react/forbid-prop-types': [0, { forbid: [] }],
    'import/extensions': [1, 'never', { svg: 'always' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'react/prop-types': 'off',
    'flowtype/require-valid-file-annotation': 0,
    'flowtype/no-types-missing-file-annotation': 0,
  },
};
