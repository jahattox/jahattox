import CaseStudiesList from './case_studies_list.jsx';
import {composeWithTracker} from 'react-komposer';

function composer(props, onData) {
  const handle = Meteor.subscribe('caseStudies');
  if ( handle.ready() ) {
    const caseStudies = CaseStudies.find().fetch();
    onData(null, {caseStudies});
  };
};

export default composeWithTracker(composer)(CaseStudiesList);