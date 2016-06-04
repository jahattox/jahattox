import CaseStudySingle from './case_study_single.jsx';
import {composeWithTracker} from 'react-komposer';

function composer(props, onData) {
  const handle = Meteor.subscribe('caseStudySingle', props.slug);

  if ( handle.ready() ) {
    const caseStudy = CaseStudies.findOne({slug: props.slug});
    onData(null, {caseStudy});
	};
};

export default composeWithTracker(composer)(CaseStudySingle);