const Regions = {
	US: "US",
	CA: "CA",
	EU: "EU",
	parse: function (valueToPase) {
		switch (valueToPase) {
		case "US":
			return Regions.US
		case "EU":
			return Regions.EU
		case "CA":
			return Regions.CA
		default:
			throw `Not possible to parse ${valueToPase} to ENUM Regions`
		}
	}
}

module.exports = Regions