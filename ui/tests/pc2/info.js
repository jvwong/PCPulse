/**
 * Nightwatch.js tests for Pathway Commons 'pc2/' info page
 * @author jvwong
 * @date 2016-04-25
 * run example:
 *      user$ nightwatch --env default --group pc2
 */
module.exports = {

    before : function(browser) {
        console.log('Setting up...');
    },

    after : function(browser) {
      // browser.pause(5000, done);
      console.log('Closing down...');
    },

    beforeEach : function(browser) {
    },

    afterEach : function(browser, done) {
      browser.pause(100, done);
    },

    'Navigation section' : function (client) {
      var page,
          section;

      page = client.page.pc2_info(),
      section = page.section.navigation;
      page
          .navigate()
          .resize();

      /* sections */
      page.expect.section('@navigation').to.be.visible;

      /* elements */
      // web_service_dropdown
      section
        .expect.element('@web_service_dropdown').to.be.visible;
      section
        .click('@web_service_link')
        .assert.cssClassPresent('@web_service_dropdown', 'open');

      // Datasources
      section
          .expect.element('@datasources').to.be.visible;
      section
          .click('@datasources')
          .assert.urlContains('/pc2/datasources');

      // Downloads
      section
          .expect.element('@downloads').to.be.visible;
      section
          .click('@downloads')
          .assert.urlContains('/pc2/downloads');

      /* END elements */
    },

    'end' : function(client){
      client.end();
    }
};
