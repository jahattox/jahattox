import React from 'react';
import {Footer} from './app.jsx';
import {CaseStudiesSection} from './templates/case_studies/case_studies.jsx';
import {ProjectsSection} from './templates/projects/projects.jsx';

export const HomePage = ({pageData}) => (
  <div className="home-container">
    <header>
      <div className="intro-content">
        <img src="/img/laptop-icon.png" className="img-responsive img-centered" alt="Laptop Icon" />
        <div className="brand-name">{pageData.fullName}</div>
        <hr className="colored" />
        <div className="brand-name-subtext">{pageData.tagline}</div>
      </div>
      <div className="scroll-down">
        <a className="btn page-scroll" href="#about"><i className="fa fa-angle-down fa-fw"></i></a>
      </div>
    </header>

    <AboutSection fullName={pageData.fullName} />
    
    <ServicesSection />

    <CaseStudiesSection />

    <ProjectsSection />

    <ContactFormSection />
  
    <Footer phone={pageData.phone} email={pageData.email} fullName={pageData.fullName} currentYear={pageData.currentYear} githubUrl={pageData.githubUrl} linkedInUrl={pageData.linkedInUrl} />
  </div>
);

export const AboutPage = ({fullName}) => (
  <AboutSection fullName={fullName} />
);

export const AboutSection = ({fullName}) => (
  <section id="about">
      <div className="container wow fadeIn">
          <div className="row">
              <div className="col-md-6">
                  <img src="/img/about.jpg" className="img-responsive" alt={fullName + "'s Photo"} />
              </div>
              <div className="col-md-6 text-center">
                  <h1>Hi, I&rsquo;m {fullName}</h1>
                  <hr className="colored" />
                  <p>I offer web consulting for growing small- and medium-sized businesses seeking to expand their online reach. Working closely with business owners, I provide a comprehensive package to help establish their brand online. From website mockups and development to customer lead generation, we'll cover every avenue to enhance and extend your business's footprint on the web.</p>
              </div>
          </div>
      </div>
  </section>
);

export const ServicesPage = ({}) => (
  <div className="services-container">
    <ServicesSection />

    <ContactFormSection />
  </div>
);

export const ServicesSection = ({}) => (
    <section id="services" className="bg-gray">
      <div className="container-fluid">
          <div className="row text-center">
              <div className="col-lg-12 wow fadeIn">
                  <h1>Services</h1>
                  <p>Though every client engagement is different, here are some of my offerings and services tailored for the web.</p>
                  <hr className="colored" />
              </div>
          </div>
          <div className="row text-center content-row">
              <div className="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".2s">
                  <div className="about-content">
                      <i className="fa fa-code-fork fa-4x"></i>
                      <h3>Website Design &amp; Development</h3>
                      <p>A modern and responsive website is central to any business on the web, and I&rsquo;ll deliver a polished project tailored to reflect your business&rsquo;s needs and overall goals.</p>
                  </div>
              </div>
              <div className="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".4s">
                  <div className="about-content">
                      <i className="fa fa-desktop fa-4x"></i>
                      <h3>Content Management</h3>
                      <p>From brochure websites to ecommerce, I&rsquo;ll provide you the ability to make adjustments to your content without needing technical intervention so you&rsquo;ll be able to change content on the fly as your business grows.</p>
                  </div>
              </div>
              <div className="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".6s">
                  <div className="about-content">
                      <i className="fa fa-bar-chart fa-4x"></i>
                      <h3>Optimization</h3>
                      <p>Utilizing A/B and multivariate testing, we can gather feedback and incorporate changes based on customer interaction on your website to get the most out of your online sales funnel.</p>
                  </div>
              </div>
              <div className="col-md-3 col-sm-6 wow fadeIn" data-wow-delay=".8s">
                  <div className="about-content">
                      <i className="fa fa-search fa-4x"></i>
                      <h3>SEO &amp; Content Strategy</h3>
                      <p>Search engines are a powerful tool to drive traffic and new leads to your website. Using web analytics, we&rsquo;ll research search terms and trends for your industry to increase key customer interactions on your website.</p>
                  </div>
              </div>
          </div>
      </div>
  </section>
);

export const ContactPage = ({}) => (
  <ContactFormSection />
);

export const ContactFormSection = ({}) => (
  <section id="contact">
    <div className="container wow fadeIn">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2>Contact</h2>
          <hr className="colored" />
          <p>Interested in getting my perspective on your business&rsquo; website? Fill out the form below and I&rsquo;ll get back to you in the next 24 hours.</p>
        </div>
      </div>
      <div className="row content-row">
        <div className="col-lg-8 col-lg-offset-2">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);

function isFilled(str) {
  return str.length > 0;
}

function isEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

class ContactForm extends React.Component {
  constructor() {
    super();
    this.state = {
      sending: false,
      submitted: false,
      cssClass: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    var self = this,
      form = e.target,
      name = form.querySelector('[name="fullName"]').value,
      email = form.querySelector('[name="email"]').value,
      phone = form.querySelector('[name="phone"]').value,
      message = form.querySelector('[name="message"]').value,
      checkName = isFilled(name),
      checkEmail = isFilled(email) && isEmail(email),
      checkPhone = isFilled(phone),
      checkMessage = isFilled(message),
      successMessage = 'Your message was sent successfully. Thanks for reaching out!',
      successClass = 'info',
      generalErrorMessage = 'There was an error encountered while sending your message. Please check your information and try again.',
      errorClass = 'danger',
      fieldsErrorMessage = 'There was an error encountered with your submitted information. Please check the fields above and try again.';

    self.setState({
      sending: true,
      submitted: false
    });

    if(checkName && checkEmail && checkPhone && checkMessage) {
      var emailText = "Message from: " + name + "\rEmail: " + email + "\rPhone: " + phone + "\rContent: " + message;
      Meteor.call('sendEmail', name, emailText, function(err, data) {
        if (!err) {
          self.setState({
            sending: false,
            submitted: true,
            cssClass: successClass,
            message: successMessage
          });

          name.value = '';
          email.value = '';
          phone.value = '';
          message.value = '';
        } else {
          self.setState({
            sending: false,
            submitted: true,
            cssClass: errorClass,
            message: generalErrorMessage
          });
        }
      });
    } else {
      self.setState({
        sending: false,
        submitted: true,
        cssClass: errorClass,
        message: fieldsErrorMessage
      });
    }
  }
  render() {
    return <div className="contact-form-container">
      <form name="sentMessage" id="contactForm" onSubmit={this.handleSubmit} novalidate>
        <div className="row control-group">
          <div className="form-group col-xs-12 floating-label-form-group controls">
            <label>Name</label>
            <input type="text" className="form-control" name="fullName" placeholder="Name" id="full-name" required data-validation-required-message="Please enter your name." />
            <p className="help-block text-danger"></p>
          </div>
        </div>
        <div className="row control-group">
          <div className="form-group col-xs-12 floating-label-form-group controls">
            <label>Email Address</label>
            <input type="email" className="form-control" name="email" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address." />
            <p className="help-block text-danger"></p>
          </div>
        </div>
        <div className="row control-group">
          <div className="form-group col-xs-12 floating-label-form-group controls">
            <label>Phone Number</label>
            <input type="tel" className="form-control" name="phone" placeholder="Phone Number" id="phone" required data-validation-required-message="Please enter your phone number." />
            <p className="help-block text-danger"></p>
          </div>
        </div>
        <div className="row control-group">
          <div className="form-group col-xs-12 floating-label-form-group controls">
            <label>Message</label>
            <textarea rows="5" className="form-control" name="message" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></textarea>
            <p className="help-block text-danger"></p>
          </div>
        </div>
        <div id="success"></div>
        <div className="row">
          <div className="form-group col-xs-12">
            <button type="submit" className="btn btn-outline-dark" disabled={this.state.sending}>{this.state.sending ? 'Sending...' : 'Send'}</button>
          </div>
        </div>
      </form>

      {this.state.submitted ? <p className={"row form-submit-message alert alert-" + this.state.cssClass}>{this.state.message}</p> : ''}
    </div>
  }
}

export default ContactFormSection;