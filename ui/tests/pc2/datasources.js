/**
 * Nightwatch.js tests for Pathway Commons 'pc2/' datasources page
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
      done();
    },

    'Datasources section' : function (client) {
      var page,
          section;

      page = client.page.pc2_datasources(),
      section = page.section.datasources;
      page
          .navigate()
          .resize();

      /* sections */
      page.expect.section('@datasources').to.be.visible;

      /* elements */
      // jumbotron
      section
        .expect.element('@jumbotron').to.be.visible;

      // Data base entries
      section
      //there is an angular load delay here...
        .waitForElementVisible('@reactome_database_entry', 5000)
          .minElements('.thumbnail', 20);

      // section
      //   .waitForElementVisible('@reactome_database_entry', 5000)
      //   .click('@reactome_database_entry')
      //   .urlContains('reactome');
      /* END elements */
    },

    'end' : function(client){
      client.end();
    }
};
