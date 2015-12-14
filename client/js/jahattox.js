Template.registerHelper('email', function() {
  return "hello@jahattox.com";
});
Template.registerHelper('fullName', function() {
  return "James Austin Hattox";
});
Template.registerHelper('tagline', function() {
  return "Web Consultant and Online Business Developer";
});
Template.registerHelper('phone', function() {
  return "1-817-776-5317";
});
Template.registerHelper('currentYear', function() {
  return new Date().getFullYear();
});

Template.homePage.helpers({
  projects: function () {
    // Show newest projects at the top
    return Projects.find({}, {sort: {createdAt: -1}});
  }
});

Template.header.helpers({
  headerClass: function() {
    // Router code to ensure the header background 
    // always behaves correctly -- translucent (default) 
    // for the home page, dark/opaque for every other page.
    if (!Session.get('isHome')) {
      return 'navbar-subpage'; 
    } else {
      return 'navbar-expanded';
    }
  },
  logoLink: function() {
    // Router code to ensure the header link is always correct
    // -- #page-top (default) for the home page, a link to '/' 
    // for every other page.
    if (!Session.get('isHome')) {
      return '/';
    } else {
      return '#page-top';
    }
  }
});

Template.body.events({
  "submit .new-project": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a project into the collection
    Projects.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";
  }
});

function isFilled(str) {
  return str.length > 0;
}

function isEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

Template.contactFormTemplate.events({
  'submit form#contactForm': function(e) {
    e.preventDefault();
    var contactForm = $(e.currentTarget),
      nameEl = contactForm.find('#full-name'),
      emailEl = contactForm.find('#email'),
      phoneEl = contactForm.find('#phone'),
      messageEl = contactForm.find('#message');

    var name = nameEl.val(),
      email = emailEl.val(),
      phone = phoneEl.val(),
      message = messageEl.val();

    var checkName = isFilled(name),
      checkEmail = isFilled(email) && isEmail(email),
      checkPhone = isFilled(phone),
      checkMessage = isFilled(message);

    var message ="",
      alert = "";

    if(checkName && checkEmail && checkPhone && checkMessage) {
      var emailText = "Message from: " + name + "\rEmail: " + email + "\rPhone: " + phone + "\rContent: " + message;

      Meteor.call('sendEmail', name, emailText);

      alert = 'info';
      message = 'Your message was sent successfully. Thanks for reaching out!';
    } else {

      alert = 'danger';
      message = 'There was an error encountered while submitting your message. Please refresh the page and try again.';
      return false;
    }

    contactForm.after('<p class="alert alert-' + alert + '">' + message + '</p>');
  }
});

Template.contactFormTemplate.rendered = function() {
  $('head').append('<script type="text/javascript" src="/assets/vitality.js"></script>');
}