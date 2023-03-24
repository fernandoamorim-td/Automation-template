module.exports = class TemplateFactory{

	// In this Class are the conditions that decide which page-object to instantiate

	/* Example of a condition:
	static async createTemplatePage(adminSession){
		if (configurationHelper.environment == Environments.PRD) {
			return new templateStalePage(adminSession)
		}
		return new templatePage(adminSession)
	}
	 */
}