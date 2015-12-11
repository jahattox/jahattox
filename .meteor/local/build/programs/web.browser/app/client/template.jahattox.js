(function(){
Template.body.addContent((function() {
  var view = this;
  return "";
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("main");
Template["main"] = new Template("Template.main", (function() {
  var view = this;
  return [ HTML.Raw("<!-- Navigation -->\n  "), HTML.NAV({
    "class": function() {
      return [ "navbar navbar-inverse navbar-fixed-top ", Spacebars.mustache(view.lookup("pageClass")) ];
    }
  }, "\n      ", HTML.DIV({
    "class": "container"
  }, "\n          ", HTML.Raw("<!-- Brand and toggle get grouped for better mobile display -->"), "\n          ", HTML.DIV({
    "class": "navbar-header"
  }, "\n              ", HTML.Raw('<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n                  <span class="sr-only">Toggle navigation</span>\n                  <span class="icon-bar"></span>\n                  <span class="icon-bar"></span>\n                  <span class="icon-bar"></span>\n              </button>'), "\n              ", HTML.A({
    "class": "navbar-brand page-scroll",
    href: function() {
      return Spacebars.mustache(view.lookup("logoLink"));
    }
  }, "\n                  ", HTML.Raw('<img src="/img/logo.png" class="img-responsive" alt="">'), "\n              "), "\n          "), "\n          ", HTML.Raw("<!-- Collect the nav links, forms, and other content for toggling -->"), "\n          ", HTML.Raw('<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n              <ul class="nav navbar-nav navbar-right">\n                  <li class="hidden">\n                      <a class="page-scroll" href="#page-top"></a>\n                  </li>\n                  <li>\n                      <a class="page-scroll" href="#about">About</a>\n                  </li>\n                  <li>\n                      <a class="page-scroll" href="#services">Services</a>\n                  </li>\n                  <li>\n                      <a class="page-scroll" href="#work">Case Studies</a>\n                  </li>\n                  <li>\n                      <a class="page-scroll" href="#project">Projects</a>\n                  </li>\n                  <li>\n                      <a class="page-scroll" href="#contact">Contact</a>\n                  </li>\n              </ul>\n          </div>'), "\n          ", HTML.Raw("<!-- /.navbar-collapse -->"), "\n      "), "\n      ", HTML.Raw("<!-- /.container -->"), "\n  "), "\n  \n  ", Spacebars.include(view.lookupTemplate("yield")), "\n  \n  ", HTML.FOOTER({
    "class": "footer",
    style: "background-image: url('/img/bg-footer.jpg')"
  }, "\n    ", HTML.DIV({
    "class": "container text-center"
  }, "\n        ", HTML.DIV({
    "class": "row"
  }, "\n            ", HTML.DIV({
    "class": "col-md-4 contact-details"
  }, "\n                ", HTML.Raw('<h4><i class="fa fa-phone"></i> Call</h4>'), "\n                ", HTML.P(Blaze.View("lookup:phone", function() {
    return Spacebars.mustache(view.lookup("phone"));
  })), "\n            "), "\n            ", HTML.Raw('<div class="col-md-4 contact-details">\n                <!--<h4><i class="fa fa-map-marker"></i> Visit</h4>\n                <p>3481 Melrose Place\n                    <br>Beverly Hills, CA 90210</p>-->\n            </div>'), "\n            ", HTML.DIV({
    "class": "col-md-4 contact-details"
  }, "\n                ", HTML.Raw('<h4><i class="fa fa-envelope"></i> Email</h4>'), "\n                ", HTML.P(HTML.A({
    href: function() {
      return [ "mailto:", Spacebars.mustache(view.lookup("email")) ];
    }
  }, Blaze.View("lookup:email", function() {
    return Spacebars.mustache(view.lookup("email"));
  })), "\n                "), "\n            "), "\n        "), "\n        ", HTML.Raw('<div class="row social">\n            <div class="col-lg-12">\n                <ul class="list-inline">\n                    <li><a href="https://github.com/harvestthemoon"><i class="fa fa-github fa-fw fa-2x"></i></a>\n                    </li>\n                    <!--<li><a href="#"><i class="fa fa-twitter fa-fw fa-2x"></i></a>\n                    </li>-->\n                    <li><a href="https://www.linkedin.com/in/james-hattox-3a7b8859"><i class="fa fa-linkedin fa-fw fa-2x"></i></a>\n                    </li>\n                </ul>\n            </div>\n        </div>'), "\n        ", HTML.DIV({
    "class": "row copyright"
  }, "\n            ", HTML.DIV({
    "class": "col-lg-12"
  }, "\n                ", HTML.P({
    "class": "small"
  }, HTML.Raw("&copy;"), " ", Blaze.View("lookup:currentYear", function() {
    return Spacebars.mustache(view.lookup("currentYear"));
  }), " ", Blaze.View("lookup:fullName", function() {
    return Spacebars.mustache(view.lookup("fullName"));
  }), ", All Rights Reserved"), "\n            "), "\n        "), "\n    "), "\n  ") ];
}));

Template.__checkName("homePage");
Template["homePage"] = new Template("Template.homePage", (function() {
  var view = this;
  return [ HTML.HEADER({
    style: "background-image: url('/img/foresty.jpg');"
  }, "\n      ", HTML.DIV({
    "class": "intro-content"
  }, "\n          ", HTML.Raw('<img src="/img/laptop-icon.png" class="img-responsive img-centered" alt="Laptop Icon">'), "\n          ", HTML.DIV({
    "class": "brand-name"
  }, Blaze.View("lookup:fullName", function() {
    return Spacebars.mustache(view.lookup("fullName"));
  })), "\n          ", HTML.Raw('<hr class="colored">'), "\n          ", HTML.DIV({
    "class": "brand-name-subtext"
  }, Blaze.View("lookup:tagline", function() {
    return Spacebars.mustache(view.lookup("tagline"));
  })), "\n      "), "\n      ", HTML.Raw('<div class="scroll-down">\n          <a class="btn page-scroll" href="#about"><i class="fa fa-angle-down fa-fw"></i></a>\n      </div>'), "\n  "), "\n  ", HTML.SECTION({
    id: "about"
  }, "\n      ", HTML.DIV({
    "class": "container wow fadeIn"
  }, "\n          ", HTML.DIV({
    "class": "row"
  }, "\n              ", HTML.DIV({
    "class": "col-md-6"
  }, "\n                  ", HTML.IMG({
    src: "/img/about.jpg",
    "class": "img-responsive",
    alt: function() {
      return [ Spacebars.mustache(view.lookup("fullName")), "'s Photo" ];
    }
  }), "\n              "), "\n              ", HTML.DIV({
    "class": "col-md-6 text-center"
  }, "\n                  ", HTML.H1("Hi, I'm ", Blaze.View("lookup:fullName", function() {
    return Spacebars.mustache(view.lookup("fullName"));
  })), "\n                  ", HTML.Raw('<hr class="colored">'), "\n                  ", HTML.Raw("<p>I offer web consulting for growing small- and medium-sized businesses seeking to expand their online reach. Working closely with business owners, I provide a comprehensive package to help establish their brand online. From website mockups and development to customer lead generation, we'll cover every avenue to enhance and extend your business's footprint on the web.</p>"), "\n              "), "\n          "), "\n      "), "\n  "), HTML.Raw('\n  <section id="services" class="bg-gray">\n      <div class="container-fluid">\n          <div class="row text-center">\n              <div class="col-lg-12 wow fadeIn">\n                  <h1>Services</h1>\n                  <p>Though every client engagement is different, here are some of my offerings and services tailored for the web.</p>\n                  <hr class="colored">\n              </div>\n          </div>\n          <div class="row text-center content-row">\n              <div class="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".2s">\n                  <div class="about-content">\n                      <i class="fa fa-code-fork fa-4x"></i>\n                      <h3>Website Design &amp; Development</h3>\n                      <p>A modern and responsive website is central to any business on the web, and I\'ll deliver a polished project tailored to reflect your business\'s needs and overall goals.</p>\n                  </div>\n              </div>\n              <div class="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".4s">\n                  <div class="about-content">\n                      <i class="fa fa-desktop fa-4x"></i>\n                      <h3>Content Management</h3>\n                      <p>From brochure websites to ecommerce, I\'ll provide you the ability to make adjustments to your content without needing technical intervention so you\'ll be able to change content on the fly as your business grows.</p>\n                  </div>\n              </div>\n              <div class="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".6s">\n                  <div class="about-content">\n                      <i class="fa fa-bar-chart fa-4x"></i>\n                      <h3>Optimization</h3>\n                      <p>Utilizing A/B and multivariate testing, we can gather feedback and incorporate changes based on customer interaction on your website to get the most out of your online sales funnel.</p>\n                  </div>\n              </div>\n              <div class="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".8s">\n                  <div class="about-content">\n                      <i class="fa fa-search fa-4x"></i>\n                      <h3>SEO &amp; Content Strategy</h3>\n                      <p>Search engines are a powerful tool to drive traffic and new leads to your website. Using web analytics, we\'ll research search terms and trends for your industry to increase key customer interactions on your website.</p>\n                  </div>\n              </div>\n          </div>\n      </div>\n  </section>\n  <section id="work">\n      <div class="container text-center wow fadeIn">\n          <h2>Case Studies</h2>\n          <hr class="colored">\n          <p>Here are a few of the larger projects that I\'ve worked on in the past.</p>\n      </div>\n  </section>\n  '), Spacebars.include(view.lookupTemplate("caseStudiesList")), "\n  ", HTML.SECTION({
    id: "contact"
  }, "\n      ", HTML.DIV({
    "class": "container wow fadeIn"
  }, "\n          ", HTML.Raw('<div class="row">\n              <div class="col-lg-12 text-center">\n                  <h2>Contact</h2>\n                  <hr class="colored">\n                  <p>Does your business have a project in need of direction? Shoot me an email and I\'ll get back to you within the next 24 hours.</p>\n              </div>\n          </div>'), "\n          ", HTML.DIV({
    "class": "row content-row"
  }, "\n              ", HTML.DIV({
    "class": "col-lg-8 col-lg-offset-2"
  }, "\n                  ", Spacebars.include(view.lookupTemplate("contactFormTemplate")), "\n              "), "\n          "), "\n      "), "\n  ") ];
}));

Template.__checkName("project");
Template["project"] = new Template("Template.project", (function() {
  var view = this;
  return HTML.LI({
    "class": function() {
      return Blaze.If(function() {
        return Spacebars.call(view.lookup("checked"));
      }, function() {
        return "checked";
      });
    }
  }, HTML.Raw('\n    <button class="delete">&times;</button>\n \n    '), HTML.INPUT({
    type: "checkbox",
    checked: function() {
      return Spacebars.mustache(view.lookup("checked"));
    },
    "class": "toggle-checked"
  }), "\n \n    ", HTML.SPAN({
    "class": "text"
  }, Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  })), "\n  ");
}));

Template.__checkName("contactFormTemplate");
Template["contactFormTemplate"] = new Template("Template.contactFormTemplate", (function() {
  var view = this;
  return HTML.FORM({
    name: "sentMessage",
    id: "contactForm",
    novalidate: ""
  }, HTML.Raw('\n    <div class="row control-group">\n        <div class="form-group col-xs-12 floating-label-form-group controls">\n            <label>Name</label>\n            <input type="text" class="form-control" placeholder="Name" id="full-name" required="" data-validation-required-message="Please enter your name.">\n            <p class="help-block text-danger"></p>\n        </div>\n    </div>\n    <div class="row control-group">\n        <div class="form-group col-xs-12 floating-label-form-group controls">\n            <label>Email Address</label>\n            <input type="email" class="form-control" placeholder="Email Address" id="email" required="" data-validation-required-message="Please enter your email address.">\n            <p class="help-block text-danger"></p>\n        </div>\n    </div>\n    <div class="row control-group">\n        <div class="form-group col-xs-12 floating-label-form-group controls">\n            <label>Phone Number</label>\n            <input type="tel" class="form-control" placeholder="Phone Number" id="phone" required="" data-validation-required-message="Please enter your phone number.">\n            <p class="help-block text-danger"></p>\n        </div>\n    </div>\n    '), HTML.DIV({
    "class": "row control-group"
  }, "\n        ", HTML.DIV({
    "class": "form-group col-xs-12 floating-label-form-group controls"
  }, "\n            ", HTML.Raw("<label>Message</label>"), "\n            ", HTML.TEXTAREA({
    rows: "5",
    "class": "form-control",
    placeholder: "Message",
    id: "message",
    required: "",
    "data-validation-required-message": "Please enter a message."
  }), "\n            ", HTML.Raw('<p class="help-block text-danger"></p>'), "\n        "), "\n    "), HTML.Raw('\n    <br>\n    <div id="success"></div>\n    <div class="row">\n        <div class="form-group col-xs-12">\n            <button type="submit" class="btn btn-outline-dark">Send</button>\n        </div>\n    </div>\n  '));
}));

Meteor.startup(function() { $('body').attr({"id":"page-top"}); });

}).call(this);
