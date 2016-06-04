import React from 'react';

class D3jsTwitterForceGraphProject extends React.Component {
	constructor() {
    super();
    this.state = {
      loading: false
    }
    this.loadGraph = this.loadGraph.bind(this);
    this.generateGraph = this.generateGraph.bind(this);
  }
	componentWillMount() {
		if ( !document.getElementsByClassName('d3js-twitter-force-graph').length ) {
			const twitterForceStyles = document.createElement('link');
			twitterForceStyles.className = 'd3js-twitter-force-graph';
			twitterForceStyles.rel = 'stylesheet';
			twitterForceStyles.type = 'text/css';
			twitterForceStyles.href = '/assets/d3js_twitter_force_graph.css';
			document.head.appendChild(twitterForceStyles);
		}
	}
 	componentDidMount() {
		const d3TipScript = document.createElement('script');
    d3TipScript.src = '/assets/d3-tip.js';

    document.body.appendChild(d3TipScript);

    const spinner = new Spinner().spin();
    document.getElementsByClassName('loading-temporary')[0].appendChild(spinner.el);
  }
  loadGraph(e) {
  	e.preventDefault(); 

		var term = e.target.querySelector('#tweet-term').value,
    	numNodes = 100,
			self = this;

		if ( term ) {
			this.setState({
				loading: true
			});

			Meteor.call('getTweetsByHashtag', term, numNodes, function(err, data) {
				self.generateGraph(data, term);
			});
		}
  }
  generateGraph(data, term) {
  	var width = 960,
	    height = 650,
	    padding = 1.5, // separation between same-color circles
	    clusterPadding = 6, // separation between different-color circles
	    minRadius = 12
	    maxRadius = 120,
	    legendWidth = 90,
	    legendHeight = 0,
	    legendRowHeight = 18,
	    legendMultiplierConstant = 1.35,
	    boxSide = 20,
			supportedLanguages = [
			  { "code": "en", "name": "English" },
			  { "code": "ar", "name": "Arabic" },
			  { "code": "bn", "name": "Bengali" },
			  { "code": "cs", "name": "Czech" },
			  { "code": "da", "name": "Danish" },
			  { "code": "de", "name": "German" },
			  { "code": "el", "name": "Greek" },
			  { "code": "es", "name": "Spanish" },
			  { "code": "fa", "name": "Persian" },
			  { "code": "fi", "name": "Finnish" },
			  { "code": "fil", "name": "Filipino" },
				{ "code": "fr", "name": "French" },
			  { "code": "he", "name": "Hebrew" },
			  { "code": "hi", "name": "Hindi" },
			  { "code": "hu", "name": "Hungarian" },
			  { "code": "in", "name": "Indonesian" },
			  { "code": "it", "name": "Italian" },
			  { "code": "ja", "name": "Japanese" },
			  { "code": "ko", "name": "Korean" },
			  { "code": "msa", "name": "Malay" },
			  { "code": "nl", "name": "Dutch" },
			  { "code": "no", "name": "Norwegian" },
			  { "code": "pl", "name": "Polish" },
			  { "code": "pt", "name": "Portuguese" },
			  { "code": "ro", "name": "Romanian" },
			  { "code": "ru", "name": "Russian" },
			  { "code": "sv", "name": "Swedish" },
			  { "code": "th", "name": "Thai" },
			  { "code": "tl", "name": "Tamil" },
			  { "code": "tr", "name": "Turkish" },
			  { "code": "uk", "name": "Ukrainian" },
			  { "code": "ur", "name": "Urdu" },
			  { "code": "vi", "name": "Vietnamese" },
			  { "code": "zh-cn", "name": "Simplified Chinese" },
			  { "code": "zh-tw", "name": "Traditional Chinese" },
			  { "code": "und", "name": "Undefined" }
			];

		function sortNumber(a, b) {
		    return a - b;
		}

		getFullLanguage = function(lang) {
			var fullLanguage = 'Not found';
			$.each(supportedLanguages, function(i, d) {
				if ( d.code === lang ) {
					fullLanguage = d.name;
				}
			});
			return fullLanguage;
		}

		console.log('data: ', data);

		this.setState({
			loading: false
		});

		var graphLabelText = 'Viewing ' + data.statuses.length + ' Twitter search results for the term "' + term + '"';
	    graphLabelWidth = graphLabelText.length * 7.5,
	    graphLabelHeight = 40,
	    graphLabelPadding = 8;
		
		// Get an array of all the tweet languages returned, as well as all the retweets.
		var tweetLangs = [],
				retweets = [];
		$.each(data.statuses, function(i, d) {
			var lang = d.lang;
			if (tweetLangs.indexOf(lang) === -1) {
				tweetLangs.push(lang);
			}
			retweets.push(d.retweet_count);
		});

		retweets.sort(sortNumber);

		// Make the legend height dependent on the returned data, and add room for two extra data points for padding.
		legendHeight = tweetLangs.length * legendRowHeight * legendMultiplierConstant + 2 * legendRowHeight;

		var numCat = tweetLangs.length,
				retweet_sizes = d3.scale.linear()
						.domain([0, retweets[retweets.length-1]])
						.range([minRadius, maxRadius]),
				color = d3.scale.category20()
		    		.domain(d3.range(numCat));

		// The largest node for each cluster.
		var clusters = new Array(numCat);
		var nodes = data.statuses.map(function(data) {
			var i = tweetLangs.indexOf(data.lang),
					t = data.text,
					d = data.created_at,
					c = data.retweet_count,
					r = retweet_sizes(c),
					l = data.lang,
					u = '@' + data.user.screen_name,
		      d = {cluster: i, tweet: t, date: d, count: c, radius: r, lang: l, username: u};
		  if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
		  return d;
		});

		var force = d3.layout.force()
		    .nodes(nodes)
		    .size([width, height])
		    .gravity(.02)
		    .charge(0)
		    .on("tick", tick)
		    .start();

		var tipCircle = d3.tip()
				.attr('class', 'd3-tip')
				.html(function(d) {
					return '<span><strong>Language:</strong> ' + getFullLanguage(d.lang) + ' (' + d.lang.toUpperCase() + ')</span>' +
									'<span><strong>User:</strong> ' + d.username + '</span>' +
									'<span><strong>Created:</strong> ' + d.date + '</span>' + 
									'<span><strong>Text:</strong> ' + d.tweet + '</span>' +
									'<span><strong>Retweets:</strong> ' + d.count + '</span>'; 
				}),
				tipLegend = d3.tip()
					.attr('class', 'd3-tip')
					.html(function(d) {
						return getFullLanguage(d);
					});

		var svg = d3.select("#twitter-force").append("svg")
		    .attr("width", width)
		    .attr("height", height)
		    .call(tipCircle)
		    .call(tipLegend);

		var circleGroups = svg.selectAll('g')
		    .data(nodes)
		  .enter().append('g')
			  .attr('data-type', 'circle-container')
		  	.attr('data-lang', function(d) {
		  		 return d.lang;
		  	})
		    .style('fill', function(d) { return color(d.cluster); })
		    .on('mouseover', tipCircle.show)
	  		.on('mouseout', tipCircle.hide)
	  	.append('circle')
		  	.attr('class', 'circle')
		    .attr('r', function(d) { return d.radius; });

		var circle = circleGroups.call(force.drag);

		var label = svg.append('g')
			.attr('class', 'graph-label-container')
			.attr('transform', 'translate(' + (graphLabelWidth / 4) + ',' + (legendRowHeight * 2) + ')');

		label.append('rect')
			.attr('class', 'graph-label')
			.attr('width', graphLabelWidth)
			.attr('height', graphLabelHeight);

		label.append('text')
			.attr('text-anchor', 'left')
			.attr('transform', 'translate(' + (graphLabelPadding * 2) + ',' + (graphLabelPadding * 3) + ')')
			.text(graphLabelText);

		var container = svg.append('g')
				.attr('class', 'legend-container')
				.attr('transform', 'translate(' + (width - legendWidth * 1.5) + ',' + (legendRowHeight * 2) + ')');

		container.append('rect')
	  		.attr('height', legendHeight)
	  		.attr('width', legendWidth)
	  		.style('fill', '#fff')
	  		.style('stroke', '#232323')
	  		.style('stroke-width', '1px');

	  var groups = container.selectAll('.legend')
	  		.data(tweetLangs)
			.enter().append('g')
				.attr('id', function(d) {
					return d;
				})
	  		.attr('class', 'legend')
		  	.attr("transform", function(d, i) {
		  		return "translate(" + legendRowHeight + "," + (legendRowHeight + i * legendRowHeight * legendMultiplierConstant) + ")";
		  	})
		  	.on('mouseover', function(d) {
		  		var containerClass = 'circle-container';
					d3.selectAll('[data-type="' + containerClass + '"]')
						.attr('class', function(inner) {
							return (inner.lang === d ? 'hover' : 'non-hover');
						});
					tipLegend.show(d);
	  		})
	  		.on('mouseout', function(d) {
	  			var containerClass = 'circle-container';
					d3.selectAll('[data-type="' + containerClass + '"]')
						.attr('class', '');
					tipLegend.hide(d);
	  		});

		groups.append('rect')
		  	.attr('width', legendRowHeight)
		  	.attr('height', legendRowHeight)
		  	.style('fill', function(d) { return color(tweetLangs.indexOf(d)); })
		  	.style('stroke', function(d) { return color(tweetLangs.indexOf(d)); });
		
		groups.append('text')
		  	.style('fill', '#232323')
		  	.attr('x', legendRowHeight * 1.5)
		  	.attr('y', legendRowHeight)
		  	.attr('text-anchor', "left")
		  	.attr('font-size', legendRowHeight + 'px')
		  	.text(function(d) { return d.toUpperCase(); });

		function tick(e) {
		  circle
		      .each(cluster(10 * e.alpha * e.alpha))
		      .each(collide(.5))
		      .attr("cx", function(d) { return d.x; })
		      .attr("cy", function(d) { return d.y; });
		}

		// Move d to be adjacent to the cluster node.
		function cluster(alpha) {
		  return function(d) {
		    var cluster = clusters[d.cluster];
		    if (cluster === d) return;
		    var x = d.x - cluster.x,
		        y = d.y - cluster.y,
		        l = Math.sqrt(x * x + y * y),
		        r = d.radius + cluster.radius;
		    if (l != r) {
		      l = (l - r) / l * alpha;
		      d.x -= x *= l;
		      d.y -= y *= l;
		      cluster.x += x;
		      cluster.y += y;
		    }
		  };
		}

		// Resolves collisions between d and all other circles.
		function collide(alpha) {
		  var quadtree = d3.geom.quadtree(nodes);
		  return function(d) {
		    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
		        nx1 = d.x - r,
		        nx2 = d.x + r,
		        ny1 = d.y - r,
		        ny2 = d.y + r;
		    quadtree.visit(function(quad, x1, y1, x2, y2) {
		      if (quad.point && (quad.point !== d)) {
		        var x = d.x - quad.point.x,
		            y = d.y - quad.point.y,
		            l = Math.sqrt(x * x + y * y),
		            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
		        if (l < r) {
		          l = (l - r) / l * alpha;
		          d.x -= x *= l;
		          d.y -= y *= l;
		          quad.point.x += x;
		          quad.point.y += y;
		        }
		      }
		      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
		    });
		  };
		}
	}
	render() {
		const project = this.props.project;
		
		return <div className="project-d3js-twitter-force-graph-container">
			<h1>{project.title}</h1>

			<span dangerouslySetInnerHTML={{__html: project.introDescription}} />
			
			<div className="row">
				<div className="col-xs-6">
					<form className="d3js-twitter-force-graph-form" onSubmit={this.loadGraph}>
						<div className="row">
							<div className="col-xs-8">
								<label for="tweet-term" className="hidden">Search term</label>
								<input type="text" placeholder="Enter search term" id="tweet-term" />
							</div>
							<div className="form-group col-xs-4">
								<button type="submit" id="get-tweets" className="btn btn-primary" disabled={this.state.loading}>{this.state.loading ? 'Creating Graph...' : 'Create Graph'}</button>
							</div>
						</div>
					</form>
				</div>
			</div>

			<div className={'loading-temporary' + (this.state.loading ? '' : ' hidden')}></div>

			{this.state.loading ? '' : <div id="twitter-force"></div>}

  	</div>
	}
}

export default D3jsTwitterForceGraphProject;