const { test, expect } = require("@playwright/test")
const RingGroupsAPIGateway = require("../../api/gateways/ring-groups-api-gateway")
const { saveApiData } = require("../../support/test-data-helper")

async function listAccountRingGroupsStep(apiSession, apiData) {
	await test.step("List account ring groups", async () => {
		const ringGroupsAPIGateway = new RingGroupsAPIGateway(apiSession)
		const ringGroupsListResponse = await ringGroupsAPIGateway.listAccountRingGroups()

		expect(await ringGroupsListResponse.ok()).toBeTruthy()

		await saveApiData (ringGroupsListResponse, apiData)
		
		// Some example to manipulate the responses:
		// Response.json()
		// const ringGroupsListJson = await ringGroupsListResponse.json()
		// Response.text()
		// const ringGroupsListText = await ringGroupsListResponse.text()
	})
}

module.exports = {
	listAccountRingGroupsStep
}
