const Environments = {
	PRD: "PRD",
	QA: "QA",
	STG: "STG",
	parse: function (valueToPase) {
		switch (valueToPase) {
		case "STG":
			return Environments.STG
		case "QA":
			return Environments.QA
		case "PRD":
			return Environments.PRD
		default:
			throw `Not possible to parse ${valueToPase} to ENUM Environments`
		}
	}
}

module.exports = Environments