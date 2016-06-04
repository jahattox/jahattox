import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './app.jsx';
import {HomePage, AboutPage, ServicesPage, ContactPage} from './static_pages.jsx';
import {CaseStudiesPage} from './templates/case_studies/case_studies.jsx';
import {CaseStudiesList} from './templates/case_studies/case_studies_container';
import CaseStudySingle from './templates/case_studies/case_study_container';
import {ProjectsPage} from './templates/projects/projects.jsx';
import {ProjectsList} from './templates/projects/projects_container';
import ProjectSingle from './templates/projects/project_container';
import PageNotFound from './404.jsx';

var pageData = {};

pageData.fullName = 'James Austin Hattox';
pageData.currentYear = new Date().getFullYear().toString();
pageData.isHome = false;
pageData.phone = '817-776-5317';
pageData.email = 'hello@jahattox.com';
pageData.githubUrl = 'https://github.com/harvestthemoon';
pageData.linkedInUrl = 'https://www.linkedin.com/in/james-hattox-3a7b8859';

FlowRouter.route('/', {
	name: 'home',
  action() {
  	pageData.isHome = true;
  	pageData.tagline='Web Consultant and Online Business Developer';
	  mount(MainLayout, {
	  	content: <HomePage pageData={pageData} />,
	  	pageData: pageData
	  });
	}
});

FlowRouter.route('/about', {
	name: 'about',
	action() {
		mount(MainLayout, {
			content: <AboutPage fullName={fullName} />,
	  	pageData: pageData
		});
	}
});

FlowRouter.route('/services', {
	name: 'services',
	action() {
		mount(MainLayout, {
			content: <ServicesPage />,
	  	pageData: pageData
		});
	}
});

FlowRouter.route('/case-studies', {
	name: 'caseStudies',
	action() {
		mount(MainLayout, {
			content: <CaseStudiesPage />,
	  	pageData: pageData
		});
	}
});

FlowRouter.route('/case-studies/:slug', {
  name: 'caseStudySingle',
  action(params) {
    mount(MainLayout, {
      content: <CaseStudySingle slug={params.slug} />,
	  	pageData: pageData
    });
  }
});

FlowRouter.route('/projects', {
	name: 'projects',
	action() {
		mount(MainLayout, {
			content: <ProjectsPage />,
	  	pageData: pageData
		});
	}
});

FlowRouter.route('/projects/:slug', {
	name: 'projectSingle',
  action(params) {
    mount(MainLayout, {
      content: <ProjectSingle slug={params.slug} />,
	  	pageData: pageData
    });
  }
});

FlowRouter.route('/contact', {
	name: 'contact',
	action() {
		mount(MainLayout, {
			content: <ContactPage />,
	  	pageData: pageData
		});
	}
});

FlowRouter.notFound = {
	action() {
		mount(MainLayout, {
			content: <PageNotFound />,
	  	pageData: pageData
		});
	}
}

let pathFor = ( path, params ) => {
  let query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
  return FlowRouter.path( path, params, query );
};

let urlFor = ( path, params ) => {
  return Meteor.absoluteUrl( pathFor( path, params ) );
};

let currentRoute = ( route ) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'active' : '';
};

FlowHelpers = {
  pathFor: pathFor,
  urlFor: urlFor,
  currentRoute: currentRoute
};