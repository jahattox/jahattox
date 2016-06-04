import React from 'react';

const PageNotFound = ({}) => (
	<section className="container wow fadeIn animated">
		<div className="subpage-content container">
			<h1>404 Error</h1>
			<p>Looks like the page you're looking for no longer exists... try going <a href={FlowHelpers.pathFor( 'home' )}>home</a>.</p>
		</div>
	</section>
);

export default PageNotFound;