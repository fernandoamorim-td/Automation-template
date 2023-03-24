const testConfig = require("../../support/configuration-helper")

module.exports = class WebhookClient {

	constructor(username, password){
		this.username = username
		this.password = password
	}

	baseEndpointPath = testConfig.WIREMOCK_SERVICE_URL

	createHeaders() {
		return {
			Accept: "*/*",
			"Accept-Encoding": "gzip, deflate, br",
			"Content-Type": "application/json",
		}
	}

	/* Example
	async postRemoveRequestsByCriteria(requestBody) {
		let headers = this.createHeaders()
		const url = `${this.baseEndpointPath}/template-endpoint`
		const auth = {
			username: this.username,
			password:this.password
		}

		return await baseHttpClient.post(url,headers,requestBody,auth)
	}

	 */

}
