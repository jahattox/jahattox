import React from 'react';

class OneHundredYearSolitudeD3jsGraphProject extends React.Component {
	constructor() {
    super();
    this.state = {
      loading: false
    }
  }
	componentWillMount() {
		if ( !document.getElementsByClassName('one-hundred-years-solitude-d3js-graph').length ) {
			const twitterForceStyles = document.createElement('link');
			twitterForceStyles.className = 'one-hundred-years-solitude-d3js-graph';
			twitterForceStyles.rel = 'stylesheet';
			twitterForceStyles.type = 'text/css';
			twitterForceStyles.href = '/assets/one_hundred_years_solitude.css';
			document.head.appendChild(twitterForceStyles);
		}
	}
	componentDidMount() {
		var graph = {
		  "nodes": [
		    { "name": "Nicanor Ulloa", "buendia": false, "generation": 0 },
		    { "name": "Rebeca Montiel", "buendia": false, "generation": 0 },
		    { "name": "Jose Arcadio Buendia", "buendia": true, "generation": 0 },
		    { "name": "Ursula Iguaran", "buendia": true, "generation": 0 },
		    { "name": "Rebeca", "buendia": false, "generation": 1 },
		    { "name": "Jose Arcadio", "buendia": true, "generation": 1 },
		    { "name": "Pilar Ternera", "buendia": false, "generation": 1 },
		    { "name": "Aureliano", "buendia": true, "generation": 1 },
		    { "name": "Remedios Moscote", "buendia": false, "generation": 1 },
		    { "name": "Amaranta", "buendia": true, "generation": 1 },
		    { "name": "Santa Sofia de la Piedad", "buendia": false, "generation": 2 },
		    { "name": "Arcadio", "buendia": true, "generation": 2 },
		    { "name": "Aureliano Jose", "buendia": true, "generation": 2 },
		    { "name": "17 Aurelianos", "buendia": true, "generation": 2 },    
		    { "name": "Fernando del Carpio", "buendia": false, "generation": 2 },
		    { "name": "Renata Argote", "buendia": false, "generation": 2 },
		    { "name": "Remedios", "buendia": true, "generation": 3 },
		    { "name": "Jose Arcadio Segundo", "buendia": true, "generation": 3 },
		    { "name": "Petra Cotes", "buendia": false, "generation": 3 },
		    { "name": "Aureliano Segundo", "buendia": true, "generation": 3 },
		    { "name": "Fernanda del Carpio", "buendia": false, "generation": 3 },
		    { "name": "Gaston", "buendia": false, "generation": 4 },
		    { "name": "Amaranta Ursula", "buendia": true, "generation": 3 },
		    { "name": "Jose Arcadio", "buendia": true, "generation": 3 },
		    { "name": "Renata Remedios", "buendia": true, "generation": 3 },
		    { "name": "Mauricio Babilonia", "buendia": false, "generation": 3 },
		    { "name": "Aureliano Babilonia", "buendia": true, "generation": 4 },
		    { "name": "Aureliano", "buendia": true, "generation": 5 }
		  ],
		  "links": [
		    { "source": 0, "target": 4, "child": true }, 
		    { "source": 0, "target": 1, "child": false }, 
		    { "source": 1, "target": 4, "child": true },
		    { "source": 1, "target": 2, "child": false },
		    { "source": 2, "target": 5, "child": true },
		    { "source": 2, "target": 7, "child": true },
		    { "source": 2, "target": 9, "child": true },
		    { "source": 3, "target": 5, "child": true },
		    { "source": 3, "target": 7, "child": true },
		    { "source": 4, "target": 5, "child": false },
		    { "source": 5, "target": 6, "child": false },
		    { "source": 5, "target": 11, "child": true },
		    { "source": 6, "target": 11, "child": true },
		    { "source": 6, "target": 12, "child": true },
		    { "source": 7, "target": 12, "child": true },
		    { "source": 7, "target": 13, "child": true },
		    { "source": 7, "target": 8, "child": false },
		    { "source": 10, "target": 11, "child": false },
		    { "source": 14, "target": 15, "child": false },
		    { "source": 10, "target": 16, "child": true },
		    { "source": 10, "target": 17, "child": true },
		    { "source": 10, "target": 19, "child": true },
		    { "source": 14, "target": 20, "child": true },
		    { "source": 15, "target": 20, "child": true },
		    { "source": 18, "target": 19, "child": false },
		    { "source": 19, "target": 20, "child": false },
		    { "source": 19, "target": 22, "child": true },
		    { "source": 19, "target": 23, "child": true },
		    { "source": 19, "target": 24, "child": true },
		    { "source": 20, "target": 22, "child": true },
		    { "source": 20, "target": 23, "child": true },
		    { "source": 20, "target": 24, "child": true },
		    { "source": 21, "target": 22, "child": false },
		    { "source": 24, "target": 25, "child": false },
		    { "source": 24, "target": 26, "child": true },
		    { "source": 25, "target": 26, "child": true },
		    { "source": 22, "target": 26, "child": false },
		    { "source": 22, "target": 27, "child": true },
		    { "source": 26, "target": 27, "child": true }
		  ]
		};

		// SVG dimensions.
		var width = 550,
		    height = 400;

		// Other constants.
		var generationMultiplier = 3;

		// Force layout.
		var force = d3.layout.force()
		    		  .charge(-120)
			   		  .linkDistance(function(d) { 
		           	  	return 80 - generationMultiplier * d.source.generation;
		      		  })
		              .size([width, height]);

		var svg = d3.select("#solitude-graph").append("svg")
		            .attr("width", width)
		            .attr("height", height);

		force.nodes(graph.nodes)
		     .links(graph.links)
		     .start();

		// Create line SVGs.
		var link = svg.selectAll(".link")
		              .data(graph.links)
		              .enter().append("line")
		              .attr("class", "link")
		              .style("stroke-width", function (d) {
		     		  	    return 2;
					        });

		// Create circle SVGs.
		var node = svg.selectAll(".node")
		    		  .data(graph.nodes)
		    		  .enter().append("g")
		    		  .attr("class", "node")
		    		  .call(force.drag);

		node.append("circle")
		    .attr("r", function(d) {
		    	return 20 - generationMultiplier * d.generation;
			  })
		    .style("fill", function (d) {
		    	// Red color.
		    	var color = "#FF4136";
		    	if (d.buendia) {
		          // Blue color.
		          color = "#0074D9";
		      }   
		    	return d3.rgb(color).brighter(d.generation / 3);
			  })

		node.append("text")
		      .attr("dx", function(d) {
			  	  return 25 - generationMultiplier * d.generation;
			    })
		      .attr("dy", ".35em")
		      .text(function(d) { return d.name });

		force.on("tick", function () {
		    link.attr("x1", function (d) {
		        	return d.source.x;
		    	  })
		        .attr("y1", function (d) {
		        	return d.source.y;
		    	  })
		        .attr("x2", function (d) {
		        	return d.target.x;
		    	  })
		        .attr("y2", function (d) {
		        	return d.target.y;
		    	  });

		    d3.selectAll("circle").attr("cx", function (d) {
		        	return d.x;
		    	  })
		        .attr("cy", function (d) {
		        	return d.y;
		    	  });

		    d3.selectAll("text").attr("x", function (d) {
		        	return d.x;
		    	  })
		        .attr("y", function (d) {
		        	return d.y;
		    	  });
		});
	}
	render() {
		const project = this.props.project;
		return <div className="project-one-hundred-years-solitude-d3js-graph-container">
			<h1>{project.title}</h1>

			<span dangerouslySetInnerHTML={{__html: project.introDescription}} />

  	</div>
	}
}

export default OneHundredYearSolitudeD3jsGraphProject;