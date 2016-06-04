Meteor.publish('caseStudies', () => {
	return CaseStudies.find({}, {limit: 3, sort: {rating: -1, title: 1}});
});

Meteor.publish('projects', () => {
	return Projects.find({}, {limit: 8, sort: {rating: -1, title: -1}});
});

Meteor.publish('caseStudySingle', slug => {
  check(slug, String);
  return CaseStudies.find();
});

Meteor.publish('projectSingle', function(slug) {
	check(slug, String);
	return Projects.find();
});