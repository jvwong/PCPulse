/**
 * Nightwatch.js tests for Pathway Commons 'pc2/' formats page
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

    'Formats section' : function (client) {
      var page,
          section;

      page = client.page.pc2_formats(),
      section = page.section.formats;
      page
          .navigate()
          .resize();

      /* sections */
      page.expect.section('@formats').to.be.visible;

      /* elements */
      section.expect.element('@gsea').to.be.visible;
      section.expect.element('@sif').to.be.visible;
      section.expect.element('@esif').to.be.visible;
      section.expect.element('@sif_relations').to.be.visible;
      section.expect.element('@sbgn').to.be.visible;
      /* END elements */
    },

    'end' : function(client){
      client.end();
    }
};
