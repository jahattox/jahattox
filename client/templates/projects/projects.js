Template.projectsList.helpers({
	projects: function() {
		return Projects.find();
	}
});

Template.projectSinglePage.helpers({
	project: function() {
		return Projects.findOne({"slug": this.params.slug});
	}
});