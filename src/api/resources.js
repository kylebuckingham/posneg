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
		request.method = 'GET'
		request.params = {
			'TableName': 'posneg'
		}
		return Vue.axios.request(request).then((response) =>{
			return response.data.Items
		}).catch(err => {
			handleError(err)
		});
	},
	sendData(d) {
			// user: "9171d969-b5bb-93fd-21d9-f29d073d8fed",
			// time: 1492215656479,
			// geo: [43.34243,-121.23423]
			// value: 0

		request.params = {}
		request.method = 'POST'
		console.log(d)
		return Vue.axios.request({
			TableName: 'posneg',
			Item: d
		}).then((response) =>{
			console.log(d)
			return response.data.Items
		}).catch(err => {
			handleError(err)
		});
	}
}