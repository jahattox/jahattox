import React from 'react';
import CaseStudiesList from './case_studies_container';
import ContactFormSection from '../../static_pages.jsx';

export const CaseStudiesPage = ({}) => (
  <div className="case-studies-page-container">
    <CaseStudiesSection />

    <ContactFormSection />
  </div>
);

export const CaseStudiesSection = ({}) => (
  <div className="case-studies-list-container">
    <section id="work">
        <div className="container text-center wow fadeIn">
            <h2>Case Studies</h2>
            <hr className="colored" />
            <p>Here are a few of the larger projects that I've worked on in the past.</p>
        </div>
    </section>
    
    <CaseStudiesList />
  </div>
);

export default CaseStudiesSection;