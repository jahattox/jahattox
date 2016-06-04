import React from 'react';
import D3jsTwitterForceGraphProject from './individual_projects/d3jsTwitterForceGraphProject.jsx';
import TextMessageTwilioFormProject from './individual_projects/textMessageTwilioFormProject.jsx';
import OneHundredYearSolitudeD3jsGraphProject from './individual_projects/oneHundredYearSolitudeD3jsGraphProject.jsx';
import TextWordCountProject from './individual_projects/textWordCountProject.jsx';
import PageNotFound from '../../404.jsx';
import ContactFormSection from '../../static_pages.jsx';

class ProjectSingle extends React.Component {
	render() {
		const showSingleProject = function(project) {
			const slug = project.slug;

			if ( slug === 'text-message-twilio-form' ) {
				return <TextMessageTwilioFormProject project={project} />;
			} else if ( slug === 'one-hundred-years-solitude-d3js-graph' ) {
				return <OneHundredYearSolitudeD3jsGraphProject project={project} />;
			} else if ( slug === 'd3js-twitter-force-graph' ) {
				return <D3jsTwitterForceGraphProject project={project} />;
			} else if ( slug === 'text-word-count' ) {
				return <TextWordCountProject project={project} />;
			}
		}

		const project = this.props.project;

		if ( project ) {
			return <div className="single-project">
				<section className="container wow fadeIn animated">
					{showSingleProject(project)}
				</section>

				<ContactFormSection />
			</div>
		} else {
			return <PageNotFound />
		}
	}
}

export default ProjectSingle;