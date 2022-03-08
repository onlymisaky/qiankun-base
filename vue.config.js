const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig(() => {
  const BASE_URL = process.env.BASE_URL || '';
  return {
    transpileDependencies: true,
    publicPath: BASE_URL,
  };
});
