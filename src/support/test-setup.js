const { chromium, expect } = require("@playwright/test")

const testConfig = require("./configuration-helper")
const LoginPage = require("../page-objects/login-page")

async function openTalkdeskPage() {
	const browser = await chromium.launch()
	const page = await browser.newPage()

	console.log(`Opening ${testConfig.baseUrl}`)
	await page.goto(testConfig.baseUrl)
	return page
}

async function loginSetup(userProfile) {
	const page = await openTalkdeskPage()
	const loginPage = await new LoginPage(page)
	await loginPage.loginWith(testConfig.userEmail(userProfile), testConfig.userPassword(userProfile))
	await expect(loginPage.submitButton).not.toBeVisible({ timeout: 30000 })
	await page.waitForLoadState("domcontentloaded")

	console.log(`Storing login state. Path: ${testConfig.adminSessionStorageStatePath}`)
	await page.context().storageState({ path: testConfig.adminSessionStorageStatePath })

	console.log("Finished login setup")
}

module.exports = {
	loginSetup
}
