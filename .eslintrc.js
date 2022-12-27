module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-chain-hopper`
  extends: ['chain-hopper'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
