const base = require("@playwright/test")
const { chromium, request } = require("@playwright/test")
const testConfig = require("./support/configuration-helper")
const OAuthAPIGateway = require("./api/gateways/oauth-gateway")
const ApiRequestContextWrapper = require("./api/gateways/api-request-context-wrapper")

exports.test = base.test.extend({
	
	userNotLoggedInSession: async ({}, use) => {
		console.log("Initiating user Not Logged in Session")
		const browser = await chromium.launch()
		const page = await browser.newPage()

		console.log(`Opening ${testConfig.baseUrl}`)
		await page.goto(testConfig.baseUrl)

		await use(page)

		console.log("Session initiated.")
	},

	adminLoggedInSession: async ({}, use) => {
		console.log(`Initiating user Logged in Session: ${testConfig.testAccount}`)
		const browser = await chromium.launch()
		const context = await browser.newContext({ storageState: testConfig.adminSessionStorageStatePath })
		const page = await context.newPage()

		console.log(`Opening ${testConfig.baseUrl}`)
		await page.goto(testConfig.baseUrl)

		await page.waitForLoadState("domcontentloaded")

		await use(page)

		console.log("Session initiated.")
	},

	accountAPISession: async ({}, use) => {
		console.log(`Initiating API in Session for account: ${testConfig.testAccount}`)
		const oAuthAPIGateway = new OAuthAPIGateway()
		const authorizationValue = "Bearer " + (await oAuthAPIGateway.accountToken())

		const talkdeskRequestContext = await request.newContext({
			baseURL:testConfig.apiBaseUrl,
			extraHTTPHeaders: {
				"Authorization": authorizationValue
			}
		})
		const apiRequestContextWrapper = new ApiRequestContextWrapper(talkdeskRequestContext)
		await use(apiRequestContextWrapper)
	},

	userAPISession: async ({}, use) => {
		console.log(`Initiating API in Session for user: ${testConfig.testAccount}`)
		const oAuthAPIGateway = new OAuthAPIGateway()
		const authorizationValue = await oAuthAPIGateway.userToken(testConfig.adminSessionStorageStatePath)

		let userAccessToken = ""
		await authorizationValue.json().then((response) => {
			userAccessToken = response.token
		})

		const talkdeskRequestContext = await request.newContext({
			baseURL: testConfig.apiBaseUrl,
			extraHTTPHeaders: {
				"Authorization": "Bearer " + userAccessToken
			}
		})
		const apiRequestContextWrapper = new ApiRequestContextWrapper(talkdeskRequestContext)
		await use(apiRequestContextWrapper)
	},
})
