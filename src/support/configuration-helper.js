const Environments = require("./environments")
const Regions = require("./regions")
require("dotenv-flow").config()

class ConfigurationHelper {
	userEmailVarPrefix = "USER_EMAIL"
	passwordVarPrefix = "USER_PASSWORD"
	clientIdVarPrefix = "CLIENT_ID_"
	clientSecretVarPrefix = "CLIENT_SECRET_"
	playwrightActivateTracePrefix = "PLAYRIWGHT_ACTIVATE_TRACE_"
	adminSessionStorageStatePath = "admin-session.json"

	constructor() {
	}

	#getEnvironmentVariableValue(variableName) {
		if(!variableName) {
			throw `Trying to get a variable value for an invalid variable [Name: ${variableName}]`
		}
		const value = process.env[variableName]
		if(value == undefined || value.trim() == "") {
			throw `Trying to get a variable value but the value is not defined [Variable: ${variableName}] [Value: ${value}]`
		}
		// For debugging purposes:
		// console.log(`Read ENV Variable [Variable: ${variableName}] [Value: ${value}]`)
		return value
	}

	get environment() {
		return Environments.parse(process.env.ENVIRONMENT)
	}

	get apiScopes() {
		return this.#getEnvironmentVariableValue("API_SCOPES").split(",")
	}

	get region() {
		return Regions.parse(process.env.REGION)
	}

	get baseUrl() {
		return this.#getEnvironmentVariableValue("BASE_URL")
	}

	get userTokenUrl(){
		return this.#getEnvironmentVariableValue("USER_TOKEN_URL")
	}

	get contactPersonPhoneNumbers() {
		return this.#getEnvironmentVariableValue("CONTACT_PERSON_PHONE_NUMBERS")
	}

	get talkdeskIdBaseUrlAPI() {
		return this.#getEnvironmentVariableValue("TALKDESK_ID_BASE_URL_API")
	}

	get apiBaseUrl() {
		return this.#getEnvironmentVariableValue("API_BASE_URL")
	}

	get nodeEnv() {
		return this.#getEnvironmentVariableValue("NODE_ENV")
	}

	get testAccount() {
		return this.#getEnvironmentVariableValue("TEST_ACCOUNT")
	}


	get branchName(){
		console.log(`The branch name is: ${process.env.GIT_BRANCH}`)
		return process.env.GIT_BRANCH
	}

	get playwrightActiveTrace() {
		if(this.branchName){
			this.replaceBranchName = this.branchName.split("-").join("_")
			const playwrightActiveTraceVar = this.playwrightActivateTracePrefix + this.replaceBranchName
			console.log(`Playwright Active Trace Var: ${playwrightActiveTraceVar}`)
			if (process.env[playwrightActiveTraceVar] == "true") {
				console.log(`The playwright trace of this branch ${this.branchName} is true, set the trace retain-on-failure.`)
				this.playwrightTrace = "retain-on-failure"
			}
			else {
				console.log(`The playwright trace of this branch ${this.branchName} is false, or can't find the playwright trace configuration. Set the trace off.`)
				this.playwrightTrace = "off"
			}
		}
		else{
			console.log("Can't read the branch name. Set the trace off.")
			this.playwrightTrace = "off"
		}
		return this.playwrightTrace
	}

	get clientId() {
		const account = this.testAccount.replaceAll("-", "_")
		const clientIdVar = this.clientIdVarPrefix + account
		console.log(`Client ID VAR: ${clientIdVar}`)
		return this.#getEnvironmentVariableValue(clientIdVar)
	}

	get clientSecret() {
		const account = this.testAccount.replaceAll("-", "_")
		const clientSecretVar = this.clientSecretVarPrefix + account
		console.log(`Client Secret VAR: ${clientSecretVar}`)
		return this.#getEnvironmentVariableValue(clientSecretVar)
	}

	userPassword(userProfile) {
		const account = this.testAccount.replaceAll("-", "_")
		const envVar = `${this.passwordVarPrefix}_${account}_${userProfile}`
		console.log(`Talkdesk User Password Var: ${envVar}`)
		return this.#getEnvironmentVariableValue(envVar)
	}

	userEmail(userProfile) {
		const account = this.testAccount.replaceAll("-", "_")
		const envVar = `${this.userEmailVarPrefix}_${account}_${userProfile}`
		console.log(`Talkdesk User Email Var: ${envVar}`)
		return this.#getEnvironmentVariableValue(envVar)
	}


	get wiremockUserName() {
		return this.#getEnvironmentVariableValue("WIREMOCK_USERNAME")
	}

	get wiremockPassword() {
		return this.#getEnvironmentVariableValue("WIREMOCK_PASSWORD")
	}

	get WIREMOCK_SERVICE_URL() {
		return process.env.WIREMOCK_SERVICE_URL
	}

}

module.exports = new ConfigurationHelper()
