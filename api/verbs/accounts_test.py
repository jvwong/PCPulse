from base import BaseTest

class Accounts(BaseTest):
	
	def test_post(self):
		payload = {
			"code_wyt": "aapl",
			"start_date": "-10"
		}
		
		dataset = [
			{"path": "transpose_accounts_1.php", "payload": payload}
		]
		
		for data in dataset:					
			self.post_test(self.__class__.__name__, data['path'], data['payload'])
		

if __name__ == "__main__":
	unittest.main()
