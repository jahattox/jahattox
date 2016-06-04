import React from 'react';
import ContactFormSection from '../../static_pages.jsx';
import ProjectsList from './projects_container';

export const ProjectsPage = ({}) => (
	<div className="projects-page">
		<ProjectsSection />

	  <ContactFormSection />
	 </div>
);

export const ProjectsSection = ({}) => (
	<section id="project">
    <div className="container text-center wow fadeIn">
      <h2>Side Projects</h2>
      <hr className="colored" />
      <p>Here are some of the smaller, standalone projects that I've worked on in the past.</p>
  	  
      <ProjectsList />
    </div>
	</section>
);