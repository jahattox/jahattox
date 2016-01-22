Template.caseStudySinglePage.helpers({
	caseStudy: function() {
		return CaseStudies.findOne({"slug": this.params.slug});
	}
});