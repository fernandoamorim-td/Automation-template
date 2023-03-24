const CircularJSON = require("circular-json")

module.exports = class apiRequestContextWrapper {

	#apiRequestContextWrapper

	constructor(apiRequestContextWrapper) {
		this.#apiRequestContextWrapper = apiRequestContextWrapper
	}

	async get(path, options) {
		console.log(">>> This request was done by a Wrapper")
		console.log(`>>> Executing request [Method: GET] [Path: /${path}] [Options: ${CircularJSON.stringify(options)}]`)

		const response = await this.#apiRequestContextWrapper.get(path, options)

		console.log(`>>> Executed Request [GET ${response.url()}][Status: ${response.status()}]`)

		return response
	}

	async post(path, options) {
		console.log(">>> This request was done by a Wrapper")
		console.log(`>>> Executing request [Method: POST] [Path: /${path}] [Options: ${CircularJSON.stringify(options)}]`)

		const response = await this.#apiRequestContextWrapper.post(path, options)

		console.log(`>>> Executed Request [POST ${response.url()}][Status: ${response.status()}]`)

		return response
	}

	async put(path, options) {
		console.log(">>> This request was done by a Wrapper")
		console.log(`>>> Executing request [Method: PUT] [Path: /${path}] [Options: ${CircularJSON.stringify(options)}]`)

		const response = await this.#apiRequestContextWrapper.put(path, options)

		console.log(`>>> Executed Request [PUT ${response.url()}][Status: ${response.status()}]`)

		return response
	}

	async patch(path, options) {
		console.log(">>> This request was done by a Wrapper")
		console.log(`>>> Executing request [Method: PATCH] [Path: /${path}] [Options: ${CircularJSON.stringify(options)}]`)

		const response = await this.#apiRequestContextWrapper.patch(path, options)

		console.log(`>>> Executed Request [PUT ${response.url()}][Status: ${response.status()}]`)

		return response
	}

	async delete(path, options) {
		console.log(">>> This request was done by a Wrapper")
		console.log(`>>> Executing request [Method: DELETE] [Path: /${path}] [Options: ${CircularJSON.stringify(options)}]`)

		const response = await this.#apiRequestContextWrapper.delete(path, options)

		console.log(`>>> Executed Request [DELETE ${response.url()}][Status: ${response.status()}]`)

		return response
	}

}
