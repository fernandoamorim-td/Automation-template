const { expect, request } = require("@playwright/test")
const testConfig = require("../../support/configuration-helper")
const formurlencoded = require("form-urlencoded")
const base64 = require("base-64")

class OAuthAPIGateway {
	async accountToken() {
		console.log(">>> Getting account token")

		const body = formurlencoded({
			grant_type: "client_credentials"
		})
		const base64Credential = base64.encode(`${testConfig.clientId}:${testConfig.clientSecret}`)
		const oauthRequestContext = await request.newContext()
		const oauthResponse = await oauthRequestContext.post(`${testConfig.talkdeskIdBaseUrlAPI}/oauth/token`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": `Basic ${base64Credential}`
			},
			data: body
		})
		expect(oauthResponse.ok()).toBeTruthy()
		const accountToken = await oauthResponse.json()
		return accountToken.access_token
	}

	async userToken(storageStatePath) {
		console.log(">>> Getting user level token")

		const requestContext = await request.newContext({ storageState: storageStatePath })
	
		const scopes = {
			"scopes[]": testConfig.apiScopes
		}

		console.log(`Executing Request [${testConfig.userTokenUrl}]`)
		const userTokenResponse = await requestContext.get(testConfig.userTokenUrl, {
			params: scopes,
			headers: {
				"Connection": "keep-alive",
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		})

		expect(userTokenResponse.ok()).toBeTruthy()
		return userTokenResponse
	}
}

module.exports = OAuthAPIGateway
