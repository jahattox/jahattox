Meteor.publish('caseStudies', function() {
	return CaseStudies.find({}, {limit: 3, sort: {rating: -1, title: -1}});
});