Router.configure(
	{
		layoutTemplate: 'main',
		loadingTemplate: 'loading',
		notFoundTemplate: '404',
		waitOn: function() {
			return Meteor.subscribe('caseStudies');
		}
	}
);

Router.route('/', {
    name: 'homePage'
});
Router.route('/case-studies/:_id', {
	name: 'caseStudyPage',
	data: function() {
		return CaseStudies.findOne(this.params._id)
	}
});

Router.onBeforeAction(function() {
	if (window.location.pathname === '/') {
		Session.set('isHome', true);
	} else {
		Session.set('isHome', false);
	}
	this.next();
})

Router.onBeforeAction('dataNotFound', {
	only: 'caseStudyPage'
});