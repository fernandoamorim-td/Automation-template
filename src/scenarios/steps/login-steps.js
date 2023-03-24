const { test } = require("@playwright/test")
const LoginPage = require("../../page-objects/login-page.js")
const testConfig = require("../../support/configuration-helper")

async function executeAdminLoginStep (talkdeskUserSession) {
	await test.step("Attempt to login with Admin", async () => {
		const loginPage = await new LoginPage(talkdeskUserSession)
		await loginPage.loginWith(testConfig.userEmail("ADMIN"), testConfig.userPassword("ADMIN"))
	})
}

module.exports = {
	executeAdminLoginStep
}
