module.exports = {
  extends: 'airbnb',
  root: true,
  plugins: ['react', 'jsx-a11y', 'import'],
  globals: {
    document: true,
    NODE_ENV: true,
    window: true,
  },
  rules: {
    'react/jsx-filename-extension': 0,
    semi: 0,
    'no-underscore-dangle': 0,
  },
}
