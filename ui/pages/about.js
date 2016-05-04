/**
 * Page object: Pathway Commons 'about'
 * @author jvwong
 * @date 2016-04-25
 */

var setupCommands,
    announcementCommands;

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
    },

    urlContains: function(term) {
      return this.api.url(function(result) {
        this.assert.urlContains(term);
      });
    },

    countElements: function(cssSelector, count) {
      var browser = this.api;
      return browser.elements('css selector', cssSelector , function (result) {
          // console.log(result);
          browser.assert.equal(result.value.length, count);
      });
    }
};

navigationCommands = {
    search: function(term) {
        return this.waitForElementVisible('@searchBar', 1000)
          .setValue('@searchBar', term)
          .submitForm('@form')
          .waitForElementNotPresent('@form', 1000);
    },

    /* visit link opnes new window
     * so we must care to switch back
     */
    visitDownloads: function(term) {
      var browser = this.api;
      this.waitForElementVisible('@downloads', 1000)
        .click('@downloads')
        .waitForElementPresent('@downloads', 1000);

      return browser.window_handles(function(result) {
          browser.switchWindow(result.value[1])
            .assert.urlContains(term);
          browser.closeWindow();
          browser.switchWindow(result.value[0]);
      });
    }
};

appCommands = {

  /* element, url */
  visitTile: function(link, term) {
    var browser = this.api;
    this.waitForElementVisible(link, 1000)
      .click(link);

    return browser.window_handles(function(result) {
        browser.switchWindow(result.value[1])
          .assert.urlContains(term);
        browser.closeWindow();
        browser.switchWindow(result.value[0]);
    });
  }
};


/*
 * Define page object
 */
module.exports = {

    /* declare the api.launchUrl inside test_settings */
    url: function() {
        return this.api.launchUrl + 'about/';
    },

    commands: [setupCommands],

    sections: {

      navigation: {
          selector: '#navbar',
          commands: [navigationCommands, setupCommands],

          elements: {
              form: {
                selector: '#pcviz-form'
              },
              searchBar: {
                selector: '#gene-text'
              },
              downloads: {
                selector: 'a[href="http://www.pathwaycommons.org/archives/"]'
              },
              apps: {
                selector: 'a[href="#apps"]'
              },
              faq: {
                selector: 'a[href="#faq"]'
              },
              publications: {
                selector: 'a[href="#publications"]'
              },
              contact: {
                selector: 'a[href="#contact"]'
              },
              title: {
                selector: 'title'
              }
          }
      } // navigation

      , apps: {
        selector: '#apps',
        commands: [appCommands, setupCommands],

        elements: {
          tiles_bio: {
            selector: '.tiles'
          },
          button_pcviz: {
            selector: 'a[href*="pcviz"]'
          },
          button_chibe: {
            selector: 'a[href*="chibe"]'
          },
          button_cypath: {
            selector: 'a[href*="cypath2"]'
          },
          button_pc2: {
            selector: 'a[href*="pc2"]'
          },
          button_biopax: {
            selector: 'a[href*="biopax.org"]'
          },
          button_paxtoolsr: {
            selector: 'a[href*="paxtoolsr"]'
          },
          tiles_cbio: {
            selector: 'a[href*="pcviz"]'
          }
        }
      }// apps
    }

};
