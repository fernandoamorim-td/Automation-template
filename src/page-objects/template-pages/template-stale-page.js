const TemplatePage = require("./template-page")

module.exports = class TemplateStalePage extends TemplatePage{
	// In this Class all Stale behaviors from this page should be placed, 
	// while in the inherit page we should add the new behavior

	// If there are fixed stale locators you should put them here after the "super"
	// WARNING: Remember to remove them after the new version be available in both environments (QA and PRD)
	constructor(playwrightPage){
		super(playwrightPage)
	}
}