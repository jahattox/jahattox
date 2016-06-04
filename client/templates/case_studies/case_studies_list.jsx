import React from 'react';

const CaseStudiesList = ({caseStudies}) => (
  <section className="portfolio-carousel wow fadeIn">
    {caseStudies.map(({title, background, description, solution, img, altText, url, logo, slug}) => (
      <div className="item" key={slug} style={{backgroundImage: 'url("' + background + '")'}}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-md-push-8">
              <div className="project-details">
                <a href={url}><img src={logo} className="img-responsive client-logo" alt={title + ' Logo'} /></a>
                <span className="project-name">{title}</span>
                <span className="project-description">{description}</span>
                <hr className="colored" />
                {solution.length ? <a href={FlowRouter.path('caseStudySingle', {slug})} className="btn btn-outline-light">View Details <i className="fa fa-long-arrow-right fa-fw"></i></a> : ''}
              </div>
            </div>
            <div className="col-md-8 col-md-pull-4 hidden-xs">
              <img src={img} className="img-responsive portfolio-image" alt={altText} />
            </div>
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default CaseStudiesList;