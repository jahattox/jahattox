import ProjectsList from './projects_list.jsx';
import {composeWithTracker} from 'react-komposer';

function composer(props, onData) {
  const handle = Meteor.subscribe('projects');
  if ( handle.ready() ) {
    const projects = Projects.find().fetch();
    onData(null, {projects});
  };
};

export default composeWithTracker(composer)(ProjectsList);