import React from 'react';
import PageNotFound from '../../404.jsx';
import ContactFormSection from '../../static_pages.jsx';

class CaseStudySingle extends React.Component {
	render() {
		const caseStudy = this.props.caseStudy;

		if ( caseStudy ) {
			return <section className="single-case-study">
				<div className="container wow fadeIn animated">
					<h1>{caseStudy.title} Case Study</h1>

					<a href={caseStudy.url}><img src={caseStudy.logo} className="img-responsive client-logo" alt={caseStudy.title + ' Logo'} /></a>

					<strong>Focus:</strong> {caseStudy.description}

					{/* Before/after images will go here. */}

					{caseStudy.problem.length ? 
						<div>
							<h2>The Problem</h2>
							<span dangerouslySetInnerHTML={{__html: caseStudy.problem}} />
						</div>
					: ''}

					{caseStudy.solution.length ?
						<div>
							<h2>The Solution</h2>
							<span dangerouslySetInnerHTML={{__html: caseStudy.solution}} />
						</div>
					: ''}

					<br />

					<a className="btn btn-primary" href={FlowRouter.path('caseStudies')}>&laquo; View Other Case Studies</a>
				</div>

				<ContactFormSection />
			</section>
		} else {
			return <PageNotFound />
		}
	}
}

export default CaseStudySingle;