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
      console.log('Closing down...');
    },

    beforeEach : function(browser) {

    },

    afterEach : function(browser, done) {
        done();
    },

    'Navigation section' : function (client) {
      var page,
          section;

      page = client.page.about(),
      section = page.section.navigation;
      page
          .navigate()
          .resize();

      /* sections */
      // page.expect.section('@navigation').to.be.visible;

      /* elements */
      // Apps
      // section
      //   .expect.element('@apps').to.be.visible;
      // section
      //   .click('@apps')
      //   .urlContains('#apps');
      //
      // // Publications
      // section
      //     .expect.element('@publications').to.be.visible;
      // section
      //   .click('@publications')
      //   .urlContains('#publications');
      //
      // // contact
      // section
      //     .expect.element('@contact').to.be.visible;
      // section
      //   .click('@contact')
      //   .urlContains('#contact');
      //
      // // Downloads
      // section
      //     .expect.element('@downloads').to.be.visible;
      // section
      //     .visitDownloads('archives');
      //
      // // Search for term and sanity check pcviz/
      // section
      //     .search('BRCA1');
      /* END elements */
    },

    'end' : function(client){
      client.end();
    }
};
