# PCPulse

## UI Tests
To setup the UI tests, you'll need to clone this repo and install the required libraries. You will need to have NodeJS installed. The following instructions are relevant to the `ui` directory.

### Download Selenium

[Download](http://selenium-release.storage.googleapis.com/index.html) the latest version of the selenium-server-standalone-{VERSION}.jar file from the Selenium downloads page. A good practice is to create a separate subfolder (e.g. bin) and place it there.
```
 $ mkdir -p ui/bin 
 $ cd ui/bin && wget http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.0.jar
```

### Install Nightwatch

Install [Nightwatch](http://nightwatchjs.org/) globally
```
 $ sudo npm install -g nightwatch
```

### Install NodeJS dependencies 

Install npm packages declared in package.json
```
 $ npm install 
```

### Running tests
You can run the test (groups) from the command line: 
```
 $ nightwatch --env default --group about --group pc2
```

You can also just use the shell script: 
```
 $ ./test.sh
```

## Webservice API Tests
You will need to have python <= version 3.3 installed for compatibility with the xml-related [library](https://www.crummy.com/software/BeautifulSoup/bs4/doc/). The following instructions are relevant to the `api` directory.

### Install python and dependencies

Use a python environment tool to install python and associated-packages as declared in `conda-requirements.txt`.

If using [conda](https://www.continuum.io/downloads):
```
 $ conda create --name pctest --file conda-requirements.txt
 $ source activate pctest
```

Run the tests from the command-line:
```
 $ python -m unittest discover -v -s tests
```

or using the bash script:
```
 $ ./test.sh
```


