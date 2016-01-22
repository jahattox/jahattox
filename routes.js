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
    name: 'homePage',
    data: function() {
    	Session.set('isHome', true);
    }
});
Router.route('/about', {
	name: 'aboutPage',
	template: 'aboutPage'
});
Router.route('/services', {
	name: 'servicesPage',
	template: 'servicesPage'
});
Router.route('/case-studies', {
	name: 'caseStudiesPage',
	data: function() {
		return CaseStudies;
	}
});
Router.route('/case-studies/:slug', {
	name: 'caseStudySinglePage',
	subscriptions: function() {
    return Meteor.subscribe('caseStudySinglePage', this.params.slug);
  },
  data: function() {
    var caseStudy = CaseStudies.findOne({"slug": this.params.slug});
    if (caseStudy) {
      return caseStudy;
    }
  },
});
Router.route('/projects', {
	name: 'projectsPage',
	template: 'projectsPage'
});
Router.route('/projects/:slug', {
	name: 'projectSinglePage',
	data: function() {
		return Projects.findOne(this.params._id);
	}
})
Router.route('/contact', {
	name: 'contactPage',
	template: 'contactPage'
});

Router.onBeforeAction(function() {
	if (Router.current().url === '/') {
		Session.set('isHome', true);
		$('body').removeClass('subpage');
	} else {
		Session.set('isHome', false);
		$('body').addClass('subpage');
	}
	this.next();
});

Router.onBeforeAction('dataNotFound', {
	only: 'caseStudyPage'
});

Router.onAfterAction(function() {
	$(document).scrollTop( $("#page-top").offset().top );
})