/**
 * Page object: Pathway Commons 'pc2' formats page
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

formatCommands = {
};

/*
 * Define page object
 */
module.exports = {

    /* declare the api.launchUrl inside test_settings */
    url: function() {
        return this.api.launchUrl + 'pc2/formats';
    },

    commands: [setupCommands],

    sections: {

      formats: {
          selector: '#content',
          commands: [utilCommands, formatCommands],

          elements: {
            jumbotron: {
              selector: '.jumbotron'
            },
            gsea: {
              selector: '#gsea'
            },
            sif: {
              selector: '#sif'
            },
            esif: {
              selector: '#esif'
            },
            sif_relations: {
              selector: '#sif_relations'
            },
            sbgn: {
              selector: '#sbgn'
            }
          }
      }
    }
};
