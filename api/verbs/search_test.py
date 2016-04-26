from base import BaseTest

# python -m unittest response.HomeTab
class Search(BaseTest):

	def test_get(self):
		paths = (
			'search.xml?q=Q06609',
			'search.json?q=Q06609',
			'search.json?q=Q06609&type=pathway'
		)

		for path in paths:
			self.get_test(self.__class__.__name__, path)

	# def test_post(self):
	# 	dataset = [
	# 		{"path": "query_chart_home_2.php", "payload": {'date': '2012-05-01'}}
	# 	]
	#
	# 	for data in dataset:
	# 		self.post_test(self.__class__.__name__, data['path'], data['payload'])
