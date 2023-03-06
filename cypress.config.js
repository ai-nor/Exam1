const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges:false, 
    pageLoadTimeout:60000,
    baseUrl: 'https://juice-shop-sanitarskyi.herokuapp.com',
  },
});
