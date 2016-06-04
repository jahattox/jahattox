import React from 'react';

class ProjectsList extends React.Component {

	componentDidMount() {
		// Portfolio Hover Effect
	  var filterList = {
	    init: function() {
	      // MixItUp plugin
	      // http://mixitup.io
	      $('#portfoliolist').mixitup({
	        // call the hover effect
	        onMixEnd: filterList.hoverEffect()
	      });
	    },

	    hoverEffect: function() {
	      // Simple parallax effect
	      $('#portfoliolist .portfolio').hover(
	      	function() {
	          $(this).find('.caption').stop().animate({
	            bottom: 0
	          }, 200, 'easeOutQuad');
	          $(this).find('img').stop().animate({
	            top: -20
	          }, 300, 'easeOutQuad');
	        },
	        function() {
	        	$(this).find('.caption').stop().animate({
	            bottom: -75
	          }, 200, 'easeInQuad');
	          $(this).find('img').stop().animate({
	            top: 0
	          }, 300, 'easeOutQuad');
	        }
	      );
	    }
	  };

	  filterList.init();
	}

	render () {
		const projects = this.props.projects;
	  return <div className="row">
	    <div className="col-lg-12">
	      <div id="portfoliolist">
		      {projects.map(({title, titleTagline, img, altText, slug}) => (
		        <a key={slug} href={FlowRouter.path('projectSingle', {slug})}>
						  <div className="portfolio identity project-list-item">
						    <div className="portfolio-wrapper">
						      <img src={img} alt={altText.length ? altText : title} />
						      <div className="caption">
						        <div className="caption-text">
						          <span className="text-title">{title}</span>
						          <span className="text-category">{titleTagline}</span>
						        </div>
						        <div className="caption-bg"></div>
						      </div>
						    </div>
						  </div>
						</a>
		       ))}
	      </div>
	    </div>
	  </div>
	}
}

export default ProjectsList;