import unittest
from urllib import parse
import json
import csv
import requests
import json
import os
from urllib import parse
import csv
import time

#Pre-configured paths
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
REPORTS_DIR = os.path.join(BASE_DIR, 'reports')

if not os.path.exists(REPORTS_DIR):
    os.makedirs(REPORTS_DIR)

class BaseTest(unittest.TestCase):
	@classmethod
	def setUpClass(cls):
		super(BaseTest, cls).setUpClass()

		# Create a csv file to write out
		cls.filename = os.path.abspath(os.path.join(REPORTS_DIR, 'results_' + time.strftime("%Y-%m-%d") + '.csv'))
		# csv file header names
		cls.fieldnames = ['type', 'date', 'method', 'status_code', 'path', 'query', 'records', 'elapsed', 'content-type', 'records']
		# webservice url
		cls.url = 'http://beta.pathwaycommons.org/pc2/'

		# content-type headers
		cls.headers_json = {'Content-Type': 'application/json'}
		cls.headers_xml = {'Content-Type': 'application/xml'}
		cls.headers_form = {'Content-Type': 'application/x-www-form-urlencoded'}

		exists = os.path.isfile(cls.filename)
		if not exists:
			with open(cls.filename, 'w') as csvfile:
				writer = csv.DictWriter(csvfile, fieldnames=cls.fieldnames)
				writer.writeheader()

	@classmethod
	def tearDownClass(cls):
		super(BaseTest, cls).tearDownClass()


	def setUp(self):
		super(BaseTest, self).setUp()


	def tearDown(self):
		super(BaseTest, self).tearDown()


	def get_test(self, type, path):
		# Make the request
		response = requests.get(parse.urljoin(self.url, path))
		self.process(type, 'GET', path, response)


	def post_test(self, type, path, payload):

		# Make the request
		response = requests.post(
			parse.urljoin(self.url, path),
			headers=self.headers_form,
			data=payload)
		self.process(type, 'POST', path, response)


	def process(self, type, method, path, response):
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
		results['elapsed'] = response.elapsed
		results['content-type'] = response.headers['Content-Type']

		# print(response.headers['Content-Type'])
		if self.headers_json['Content-Type'] in results['content-type']:
			try:
				jsonOut = response.json()
				results['records'] = jsonOut['numHits']
				doPrint = True
			except ValueError:
				print('Error decoding JSON')

		if self.headers_xml['Content-Type'] in results['content-type']:
			try:
				print('some xml')
			except ValueError:
				print('Error decoding XML')

		if doPrint:
			with open(self.filename, 'a') as csvfile:
				writer = csv.DictWriter(csvfile, fieldnames=self.fieldnames)
				writer.writerow(results)
