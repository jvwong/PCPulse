/**
 * Nightwatch.js tests for Pathway Commons 'about' page
 * @author jvwong
 * @date 2016-04-25
 * run example:
 *      user$ nightwatch --env default --group about
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
      page.expect.section('@navigation').to.be.visible;

      /* elements */
      // Apps
      section
        .expect.element('@apps').to.be.visible;
      section
        .click('@apps')
        .urlContains('#apps');

      // Publications
      section
          .expect.element('@publications').to.be.visible;
      section
        .click('@publications')
        .urlContains('#publications');

      // contact
      section
          .expect.element('@contact').to.be.visible;
      section
        .click('@contact')
        .urlContains('#contact');

      // Downloads
      section
          .expect.element('@downloads').to.be.visible;
      section
          .visitDownloads('archives');

      // Search for term and sanity check pcviz/
      section
          .search('BRCA1');
      /* END elements */
    },

    'App section' : function (client) {
      var page,
          section;

      page = client.page.about(),
      section = page.section.apps;
      page.navigate();

      /* elements */
      // Biologist Tiles
      section
        .expect.element('@tiles_bio').to.be.visible;
      section
        .expect.element('@tiles_cbio').to.be.visible;

      section
        .countElements('.tile', 6);

      //Visit the tiles and match the url path
      section.visitTile('@button_pcviz', 'pcviz');
      section.visitTile('@button_chibe', 'chibe');
      section.visitTile('@button_cypath', 'cypath2');
      section.visitTile('@button_pc2', 'pc2');
      section.visitTile('@button_biopax', 'biopax');
      section.visitTile('@button_paxtoolsr', 'paxtoolsr');
    },

    'end' : function(client){
      client.end();
    }
};
