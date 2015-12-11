(function(){
Template.__checkName("caseStudy");
Template["caseStudy"] = new Template("Template.caseStudy", (function() {
  var view = this;
  return HTML.DIV({
    "class": "item",
    style: function() {
      return [ "background-image: url('", Spacebars.mustache(view.lookup("background")), "')" ];
    }
  }, "\n    ", HTML.DIV({
    "class": "container-fluid"
  }, "\n      ", HTML.DIV({
    "class": "row"
  }, "\n        ", HTML.DIV({
    "class": "col-md-4 col-md-push-8"
  }, "\n          ", HTML.DIV({
    "class": "project-details"
  }, "\n            ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("url"));
    }
  }, HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("logo"));
    },
    "class": "img-responsive client-logo",
    alt: function() {
      return [ Spacebars.mustache(view.lookup("title")), " Logo" ];
    }
  })), "\n            ", HTML.SPAN({
    "class": "project-name"
  }, Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n            ", HTML.SPAN({
    "class": "project-description"
  }, Blaze.View("lookup:description", function() {
    return Spacebars.mustache(view.lookup("description"));
  })), "\n            ", HTML.Raw('<hr class="colored">'), "\n            ", HTML.Raw('<!--<a href="#portfolioModal1" data-toggle="modal" class="btn btn-outline-light">View Details <i class="fa fa-long-arrow-right fa-fw"></i></a>-->'), "\n          "), "\n        "), "\n        ", HTML.DIV({
    "class": "col-md-8 col-md-pull-4 hidden-xs"
  }, "\n          ", HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("img"));
    },
    "class": "img-responsive portfolio-image",
    alt: function() {
      return Spacebars.mustache(view.lookup("altText"));
    }
  }), "\n        "), "\n      "), "\n    "), "\n	");
}));

}).call(this);
