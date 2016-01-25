Template.projectsList.helpers({
	projects: function() {
		return Projects.find();
	}
});

Template.project.rendered = function() {
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

Template.projectSinglePage.helpers({
	project: function() {
		return Projects.findOne({"slug": this.params.slug});
	},
	showTextMessageTwilioForm: function() {
		return this.slug === 'text-message-twilio-form';
	},
	showOneHundredYearsSolitudeD3jsGraph: function() {
		return this.slug === 'one-hundred-years-solitude-d3js-graph';
	}
});