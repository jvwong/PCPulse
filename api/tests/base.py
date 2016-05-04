import unittest
from requests.exceptions import Timeout, RequestException
import requests
import os
from urllib import parse
import csv
import time
from bs4 import BeautifulSoup

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
REPORTS_DIR = os.path.join(BASE_DIR, 'reports')
TIMEOUT_LIMIT = 120

if not os.path.exists(REPORTS_DIR):
    os.makedirs(REPORTS_DIR)


class BaseTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        super(BaseTest, cls).setUpClass()

        # Create a csv file to write out
        cls.filename = os.path.abspath(os.path.join(REPORTS_DIR, 'results_' + time.strftime("%Y-%m-%d") + '.csv'))
        # csv file header names
        cls.fieldnames = ['type', 'date', 'method', 'status_code',
                          'path', 'query', 'elapsed', 'content-type', 'records', 'error']
        # webservice url
        cls.url = 'http://www.pathwaycommons.org/pc2/'

        # content-type headers
        cls.headers_json = {'Content-Type': 'application/json'}
        cls.headers_xml = {'Content-Type': 'application/xml'}
        cls.headers_biopax = {'Content-Type': 'application/vnd.biopax.rdf+xml'}
        cls.headers_plain = {'Content-Type': 'text/plain'}

        exists = os.path.isfile(cls.filename)
        if not exists:
            with open(cls.filename, 'w+') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=cls.fieldnames)
                writer.writeheader()

    @classmethod
    def tearDownClass(cls):
        super(BaseTest, cls).tearDownClass()

    def setUp(self):
        super(BaseTest, self).setUp()

    def tearDown(self):
        super(BaseTest, self).tearDown()

    def get_test(self, type, query):
        path = parse.urljoin(self.url, query)
        start = time.time()
        # Make the request
        try:
            start = time.time()
            response = requests.get(path, timeout=TIMEOUT_LIMIT)
            elapsed = time.time() - start
            self.onSuccess(type, 'GET', response, elapsed)
        except Timeout:
            elapsed = time.time() - start
            self.onFailure(type, 'GET', path, elapsed, 'Timeout')
        except RequestException:
            elapsed = time.time() - start
            self.onFailure(type, 'GET', path, elapsed, 'Request Failure')

    def onFailure(self, type, method, path, elapsed, error):
        # extract the parsed response url
        rurl = parse.urlparse(path)
        results = dict()
        results['type'] = type
        results['date'] = time.strftime("%Y-%m-%d %H:%M:%S")
        results['method'] = method
        results['path'] = rurl.path
        results['query'] = rurl.query
        results['elapsed'] = elapsed
        results['error'] = error
        self.writeout(results)

    def onSuccess(self, type, method, response, elapsed):
        doPrint = False

        # extract the parsed response url
        rurl = parse.urlparse(response.url)

        # Store the results
        results = dict()
        results['type']	= type
        results['date']	= time.strftime("%Y-%m-%d %H:%M:%S")
        results['method'] = method
        results['path'] = rurl.path
        results['query'] = rurl.query
        results['status_code'] = response.status_code
        results['elapsed'] = elapsed
        results['content-type'] = response.headers['Content-Type']

        # print(response.headers['Content-Type'])
        # For more info on response content - pathwaycommons.org/pc2/help/schema
        # application/json
        if self.headers_json['Content-Type'] in results['content-type']:
            try:
                jsonOut = response.json()
                results['records'] = jsonOut['numHits']
                doPrint = True
            except ValueError:
                print('Error decoding JSON')

        # application/xml - TraverseResponse; SearchResponse
        if self.headers_xml['Content-Type'] in results['content-type']:
            try:
                soup = BeautifulSoup(response.text, 'xml')
                if type == 'Search':
                    results['records'] = soup.searchResponse['numHits']
                elif type == 'Traverse':
                    results['records'] = len(soup.find_all('traverseResponse', limit=1))
                doPrint = True
            except ValueError:
                print('Error decoding XML')

        # application/vnd.biopax.rdf+xml
        if self.headers_biopax['Content-Type'] in results['content-type']:
            try:
                results['records'] = response.headers['Content-Length']
                doPrint = True
            except ValueError:
                print('Error decoding application/vnd.biopax.rdf+xml')

        # catch all - text/plain
        if self.headers_plain['Content-Type'] in results['content-type']:
            try:
                results['records'] = response.headers['Content-Length']
                doPrint = True
            except ValueError:
                print('Error decoding text/plain')

        if doPrint:
            self.writeout(results)

    def writeout(self, results):
        with open(self.filename, 'a') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=self.fieldnames)
            writer.writerow(results)

