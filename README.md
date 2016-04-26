# pc_testing

## Requirements
nodeJS

### Install Nightwatch

Install [Nightwatch](http://nightwatchjs.org/) globally
```
 $ sudo npm install -g nightwatch
```

### Install NodeJS dependencies 

From within the ui directory, install npm packages declared in package.json
```
 $ npm install 
```

### Download Selenium

[Download](http://selenium-release.storage.googleapis.com/index.html) the latest version of the selenium-server-standalone-{VERSION}.jar file from the Selenium downloads page and place it on the computer with the browser you want to test. In most cases this will be on your local machine and typically inside your project's source folder.

A good practice is to create a separate subfolder (e.g. bin) and place it there as you might have to download other driver binaries if you want to test multiple browsers.

### Running tests
You can run the test (groups) from the command line while inside the ui directory
```
 $ nightwatch --env default --group about --group pc2
```

or from the parent directory using the supplied shell script test.sh
```
 $ ./test.sh
```


