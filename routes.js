Router.configure(
	{
		layoutTemplate: 'main',
		loadingTemplate: 'loading',
		notFoundTemplate: '404',
		waitOn: function() {
			return Meteor.subscribe('projects');
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
    var caseStudy = CaseStudies.findOne({ "slug": this.params.slug });
    if (caseStudy) {
      return caseStudy;
    }
  },
});
Router.route('/projects', {
	name: 'projectsPage',
	data: function() {
		return Projects;
	}
});
Router.route('/projects/:slug', {
	name: 'projectSinglePage',
	subscriptions: function() {
		return Meteor.subscribe('projectSinglePage', this.params.slug);
	},
	data: function() {
		var project = Projects.findOne({ "slug": this.params.slug });
		if (project) {
			Session.set('projectTemplate', this.params.slug);
			return project;
		}
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