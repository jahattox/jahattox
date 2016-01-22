Meteor.publish('caseStudies', function() {
	return CaseStudies.find({}, {limit: 3, sort: {rating: -1, title: -1}});
});

Meteor.publish('projects', function() {
	return Projects.find({}, {limit: 8, sort: {rating: -1, title: -1}});
});

Meteor.publish('caseStudySinglePage', function(slug){
  check(slug, String);
  var data = CaseStudies.find({"slug": slug});
  if (data) {
    return data;
  }
  this.ready();
});