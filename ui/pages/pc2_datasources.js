/**
 * Page object: Pathway Commons 'pc2' datasources page
 * @author jvwong
 * @date 2016-04-25
 */

var
  setupCommands,
  utilCommands,
  dataCommands;

/*
 * Define commands
 */
setupCommands = {
    resize: function() {
        return this.api.pause(250)
            .waitForElementVisible('body', 250)
            .resizeWindow(1024, 768);
    },

    setWindow: function(view) {
      var browser = this.api;
      return browser.window_handles(function(result) {
          var handle = result.value[view];
          browser.switchWindow(handle);
      });
    }
};

utilCommands = {
  urlContains: function(term) {
    return this.api.url(function(result) {
      this.assert.urlContains(term);
    });
  },

  countElements: function(cssSelector, count) {
    var browser = this.api;
    return browser.elements('css selector', cssSelector , function (result) {
        browser.assert.equal(result.value.length, count);
    });
  },

  minElements: function(cssSelector, min) {
    var browser = this.api;
    return browser.elements('css selector', cssSelector , function (result) {
        browser.assert.equal(result.value.length > min, true);
    });
  }
};

dataCommands = {
};

/*
 * Define page object
 */
module.exports = {

    /* declare the api.launchUrl inside test_settings */
    url: function() {
        return this.api.launchUrl + 'pc2/datasources';
    },

    commands: [setupCommands],

    sections: {

      datasources: {
          selector: '#pathway_datasources',
          commands: [utilCommands, dataCommands],

          elements: {
            jumbotron: {
              selector: '.jumbotron'
            },
            reactome_database_entry: {
              selector: 'a[href*="www.reactome.org"]'
            }
          }
      }
    }
};
