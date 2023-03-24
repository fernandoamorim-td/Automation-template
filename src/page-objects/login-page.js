module.exports = class LoginPage {

	constructor(page){
		this.accountNameInput = page.locator("//input[@data-id=\"accountName\"]")
		this.submitButton = page.locator("//button[@type=\"submit\"]")
		this.userEmailField = page.locator("//input[@type=\"email\"]")
		this.userPasswordField = page.locator("//input[@type=\"password\"]")
	}

	async loginWith(userEmail, userPassword) {
		console.log(">>> Submitting account credentials")
		console.log(`>>> User name:  ${userEmail}`)
		if (userPassword) {
			console.log(">>> User password is defined!")
		} else {
			console.log(">>> User password is not defined: [Value: ${userPassword}]")
		}
		await this.userEmailField.fill(userEmail)
		await this.userPasswordField.fill(userPassword)
		await this.submitButton.click()
		console.log(">>> Login complete")
	}
}
