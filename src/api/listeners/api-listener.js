// const testConfig = require("../configuration-helper")

module.exports = class ApiListener{

	/*
	async patchInteractionResponse (agentSession) {
		const urlToFind = `${testConfig.talkdeskApiBaseUrl}/omnichannel/inbox/interactions`
		console.log(`Creating PATCH Interaction Listener [Url: ${urlToFind}]`)
		return new Promise((resolve) => {
			agentSession.on("response", async (response) => {
				if (await response.url().includes(urlToFind) && await response.request().method() == "PATCH"){
					const bufferInteractionResponse = await response.body()
					const stringInteractionResponse = bufferInteractionResponse.toString()
					const jsonInteractionResponse = JSON.parse(stringInteractionResponse)
					console.log("PatchInteractionResponse listener - Interaction Id: " +jsonInteractionResponse.id)
					resolve(jsonInteractionResponse)
				}
			})
		})
	}

	async outboundInteractionResponse (agentSession) {
		const urlToFind = `${testConfig.talkdeskApiBaseUrl}/omnichannel/inbox/interactions/outbound`
		console.log(`Creating Outbound Interaction Listener [Url: ${urlToFind}]`)
		return new Promise((resolve) => {
			agentSession.on("response", async (response) => {
				if (response.url().includes(urlToFind) && response.request().method() == "POST"){
					const bufferInteractionResponse = await response.body()
					const stringInteractionResponse = bufferInteractionResponse.toString()
					const jsonInteractionResponse = JSON.parse(stringInteractionResponse)
					console.log("OutboundInteractionResponse listener - Interaction Id: " +jsonInteractionResponse.id)
					resolve(jsonInteractionResponse)
				}
			})
		})
	}

	async actionsInteractionResponse (agentSession) {
		const urlToFind = /\/omnichannel\/inbox\/interactions\/.*\/actions/i
		console.log(`Creating Actions Interaction Listener [Url: ${urlToFind}]`)
		return new Promise((resolve) => {
			agentSession.on("response", async (response) => {
				if (response.url().match(urlToFind) && response.request().method() == "POST"){
					const bufferInteractionResponse = await response.body()
					const stringInteractionResponse = bufferInteractionResponse.toString()
					const jsonInteractionResponse = JSON.parse(stringInteractionResponse)
					resolve(jsonInteractionResponse)
				}
			})
		})
	}
	*/
}
