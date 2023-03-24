const configurationHelper  = require("./configuration-helper")

function buildApiData() {
	let apiData = {}

	apiData.responses= []
	apiData.environment = configurationHelper.environment
	apiData.account = configurationHelper.testAccount
	apiData.ringGroup = configurationHelper.accountRingGroup
	apiData.usersInRingGroup = configurationHelper.usersInRingGroup
	apiData.totalRingGroups = configurationHelper.totalRingGroups
	apiData.usersIdToAssignUnassign = configurationHelper.usersIdToAssignUnassign
	apiData.teamId = configurationHelper.teamId
	apiData.userIdToUpdate = configurationHelper.userIdToUpdate
	return apiData
}

async function saveApiData(apiResponse, apiData) {
	apiData.responses.push(apiResponse)
	apiData.responses.push(await apiResponse.json())
	return await apiData
}

async function saveApiStatusData(apiResponse, apiData) {
	apiData.responses.push(apiResponse)
	apiData.responses.push(await apiResponse.status())
	return await apiData
}

module.exports = {
	buildApiData,
	saveApiData,
	saveApiStatusData
}
