class RingGroupsAPIGateway {
	
	constructor(apiSession) {
		this.apiSession = apiSession
	}

	async listAccountRingGroups() {
		console.log(">>> Getting ring groups list per account")
		const listAccountRingGroupsResponse = await this.apiSession.get("ring-groups", {})
		return await listAccountRingGroupsResponse
	}
}
module.exports = RingGroupsAPIGateway
