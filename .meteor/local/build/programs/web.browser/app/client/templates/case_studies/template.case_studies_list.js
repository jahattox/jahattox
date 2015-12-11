(function(){
Template.__checkName("caseStudiesList");
Template["caseStudiesList"] = new Template("Template.caseStudiesList", (function() {
  var view = this;
  return HTML.SECTION({
    "class": "portfolio-carousel wow fadeIn"
  }, HTML.Raw('\n      <!--<div class="item" style="background-image: url(\'/img/bg-1.jpg\')">\n          <div class="container-fluid">\n              <div class="row">\n                  <div class="col-md-4 col-md-push-8">\n                      <div class="project-details">\n                          <img src="/img/logo_eye_trends_college_station.png" class="img-responsive client-logo" alt="Eye Trends College Station Logo">\n                          <span class="project-name">Eye Trends College Station</span>\n                          <span class="project-description">Website Redesign, Content Management</span>\n                          <hr class="colored">\n                          <a href="#portfolioModal2" data-toggle="modal" class="btn btn-outline-light">View Details <i class="fa fa-long-arrow-right fa-fw"></i></a>\n                      </div>\n                  </div>\n                  <div class="col-md-8 col-md-pull-4 hidden-xs">\n                      <img src="/img/mockups_eye_trends_college_station.png" class="img-responsive portfolio-image" alt="Eye Trends College Station Redesign Mockup">\n                  </div>\n              </div>\n          </div>\n      </div>-->\n      <!--<div class="item" style="background-image: url(\'/img/bg-3.jpg\')">\n          <div class="container-fluid">\n              <div class="row">\n                  <div class="col-md-4 col-md-push-8">\n                      <div class="project-details">\n                          <img src="/img/logo-1.png" class="img-responsive client-logo" alt="">\n                          <span class="project-name">Paluxy Valley Kennels</span>\n                          <span class="project-description">Branding, Website Redesign, Ecommerce</span>\n                          <hr class="colored">\n                          <a href="#portfolioModal3" data-toggle="modal" class="btn btn-outline-light">View Details <i class="fa fa-long-arrow-right fa-fw"></i></a>\n                      </div>\n                  </div>\n                  <div class="col-md-8 col-md-pull-4 hidden-xs">\n                      <img src="/img/mobile-screens.png" class="img-responsive portfolio-image" alt="">\n                  </div>\n              </div>\n          </div>\n      </div>-->\n\n		'), Blaze.Each(function() {
    return Spacebars.call(view.lookup("caseStudies"));
  }, function() {
    return [ "\n			", Spacebars.include(view.lookupTemplate("caseStudy")), "\n		" ];
  }), "\n	");
}));

}).call(this);
