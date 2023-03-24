// This class is called in playwright.config.js
const { loginSetup } = require("./support/test-setup")

// eslint-disable-next-line no-unused-vars
module.exports = async config => {
	// All functions called here are executed as a setup
	// Example: Start a session with a specific profile such as Admin/agent
	await loginSetup("ADMIN")
}
