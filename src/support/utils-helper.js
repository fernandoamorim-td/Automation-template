const {
	v4: uuidv4
} = require("uuid")
const configurationHelper = require("./configuration-helper")


async function fixedMilliSecondWait(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function getRandomPhoneNumber() {
	const phoneNumbers = configurationHelper.contactPersonPhoneNumbers.split(",")
	const phoneNumber = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)].trim()

	return {
		internationalFormat: phoneNumber,
		outboundFormat: outboundPhoneNumber(phoneNumber),
		formatWithoutWhiteSpace: parseOnlyNumbersAndPlus(phoneNumber),
	}
}

function generateUniqueId(prefix = "") {
	return prefix + uuidv4()
}

function generateUniqueEmail(referenceEmail, combineChar = "") {
	let randomNumber = Math.floor(Math.random() * 100)
	let number = randomNumber.toString().padStart(3, "0")
	const splitEmail = referenceEmail.split("@")
	const username = `${splitEmail[0]}${combineChar}${number}`
	const domain = splitEmail[1]
	const emailAddress = `${username}@${domain}`
	return {
		username,
		domain,
		emailAddress
	}
}

function parseOnlyNumbersAndPlus(number) {
	number = number.replace(/[^\d]/g, "")
	number = "+" + number
	return number
}

function outboundPhoneNumber(number) {
	number = number.replace("+1", "")
	number = number.replace(/[^\d]/g, "")
	number = number.replace(" ", "")
	return number
}

async function retryAction(maxRetries, action, nextAttemptWaitingTime = 500) {
	try {
		return await action()
	} catch (error) {
		if (maxRetries > 0) {
			await fixedMilliSecondWait(nextAttemptWaitingTime)
			console.log(`Error ocurred. Retrying same execution [remaining attempts: ${maxRetries}]\nError:\n${error}` )
			maxRetries--
			return await retryAction(maxRetries, action, nextAttemptWaitingTime)
		} else {
			throw error
		}
	}	
}

function keyEnvironmentRegion() {
	return `${configurationHelper.environment}_${configurationHelper.region}`
}

function getRandomNumber(max, min=0) {
	const number = Math.ceil(Math.random()*(max-min) + min)
	return number
}

module.exports = {
	fixedMilliSecondWait,
	getRandomPhoneNumber,
	generateUniqueId,
	generateUniqueEmail,
	retryAction,
	keyEnvironmentRegion,
	getRandomNumber
}
