import ProjectSingle from './project_single.jsx';
import {composeWithTracker} from 'react-komposer';

function composer(props, onData) {
  const handle = Meteor.subscribe('projectSingle', props.slug);

  if ( handle.ready() ) {
    const project = Projects.findOne({slug: props.slug});
    onData(null, {project});
	};
};

export default composeWithTracker(composer)(ProjectSingle);