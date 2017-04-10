import Vue from 'vue'

var testing;

// testing = true

// Get Data
var request = {
	headers: {
		"x-api-key": 'cMapyJwfgt2bqGIbV4uMd1rN08g2ILek1WNtgeT3',
		"content-type": "application/json"
	},
	url: 'https://nygtvwgteg.execute-api.us-west-2.amazonaws.com/prod/posneg',
}

var handleError = (err) => {
	if (String(err).indexOf('401') !== -1){
		console.log(err)
	}
}

export default {
	getData() {
		request.params = {
			'TableName': 'posneg'
		}
		return Vue.axios.request(request).then((response) =>{
			return response.data.Items
		}).catch(err => {
			handleError(err)
		});
	}
}