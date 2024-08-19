const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    viewportWidth: 1280, 
    viewportHeight: 720,
    defaultCommandTimeout: 10000, 
    setupNodeEvents(on, config) {
     
    },
    retries: {
      runMode: 2,  
      openMode: 1,  
    }
  },
});
