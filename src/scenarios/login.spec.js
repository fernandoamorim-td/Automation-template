const CircularJSON = require("circular-json")

const { test } = require("../custom-fixtures")
const { expect } = require("@playwright/test")

const { executeAdminLoginStep } = require("./steps/login-steps")
const { listAccountRingGroupsStep } = require("./steps/ring-group-api-steps.js")
const { keyEnvironmentRegion } = require("../support/utils-helper")
const { buildApiData } = require("../support/test-data-helper")
const LoginPage = require("../page-objects/login-page")

test.beforeEach(async ({}, testInfo) => {
	console.log(`### Running test '${testInfo.title}'`)
})

test.afterEach(async ({ adminLoggedInSession }, testInfo) => {
	await adminLoggedInSession.context().close()
	console.log(`### API Data logging: ${CircularJSON.stringify(global.apiData)}`)
	console.log(`### Finished test '${testInfo.title}' with status: ${testInfo.status}`)
})

test.afterAll(async ({}) => {})

test(`UI not logged in session example [${keyEnvironmentRegion()}] @us @prd`, async ({ userNotLoggedInSession }) => {
	await executeAdminLoginStep(userNotLoggedInSession)
})

test(`UI reusing admin session (from Global Setup) [${keyEnvironmentRegion()}] @us @prd`, async ({ adminLoggedInSession }) => {
	const loginPage = await new LoginPage(adminLoggedInSession)
	await expect(loginPage.submitButton).not.toBeVisible()
})

test(`Account token usage example [${keyEnvironmentRegion()}] @us @prd`, async ({ accountAPISession }) => {
	global.apiData = buildApiData()

	await listAccountRingGroupsStep(accountAPISession,  global.apiData)
})

test(`User token usage example [${keyEnvironmentRegion()}] @us @prd`, async ({ userAPISession }) => {
	await listAccountRingGroupsStep(userAPISession)
})
