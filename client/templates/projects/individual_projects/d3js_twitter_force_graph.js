Template.d3jsTwitterForceGraphPage.rendered = function() {
	if (!$('link.d3js-twitter-force-graph').length) {
		$('head').append('<link class="d3js-twitter-force-graph" rel="stylesheet" type="text/css" href="/assets/d3js_twitter_force_graph.css">');
	}
}