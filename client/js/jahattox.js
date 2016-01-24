Template.registerHelper('hasProjects', function() {
  return Projects.find().count() > 0;
});
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

if (Meteor.isClient) {
  appendMessageToForm = function(form, alert, message) {
    form.siblings('.form-submit-message').remove();
    form.after('<p class="row form-submit-message alert alert-' + alert + '">' + message + '</p>');

    return true;
  }
}

Template.header.helpers({
  headerClass: function() {
    // Router code to ensure the header background 
    // always behaves correctly -- translucent (default) 
    // for the home page, dark/opaque for every other page.
    if (Session.get('isHome')) {
      return 'navbar-expanded'; 
    } else {
      return 'navbar-subpage';
    }
  },
  isHome: function() {
    return Session.get('isHome');
  }
});

Template.header.events({
  'click .logo-link': function(e) {
    if (window.location.pathname === '/') {
      //console.log('helper is home');
      Session.set('isHome', true);
    } else {
      //console.log('helper is not home');
      Session.set('isHome', false);
    }
  }
});

Template.main.rendered = function() {
  if (window.location.pathname === '/') {
    Session.set('isHome', true);
  } else {
    Session.set('isHome', false);
  } 
}

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

Template.contactForm.events({
  'submit #contactForm': function(e) {
    e.preventDefault();
    
    var contactForm = $(e.currentTarget),
      name = e.target.fullName.value,
      email = e.target.email.value,
      phone = e.target.phone.value,
      message = e.target.message.value;

    var checkName = isFilled(name),
      checkEmail = isFilled(email) && isEmail(email),
      checkPhone = isFilled(phone),
      checkMessage = isFilled(message);

    if(checkName && checkEmail && checkPhone && checkMessage) {
      var emailText = "Message from: " + name + "\rEmail: " + email + "\rPhone: " + phone + "\rContent: " + message;
      Meteor.call('sendEmail', name, emailText, function(err, data) {
        if (!err) {
          appendMessageToForm(contactForm, 'info', 'Your message was sent successfully. Thanks for reaching out!');

          e.target.fullName.value = '';
          e.target.email.value = '';
          e.target.phone.value = '';
          e.target.message.value = '';
        } else {
          appendMessageToForm(contactForm, 'danger', 'There was an error encountered while sending your message. Please check your information and try again.');
        }
      });
    } else {
      appendMessageToForm(contactForm, 'danger', 'There was an error encountered with your submitted information. Please check the fields above and try again.');
    }
  }
});

Template.contactForm.rendered = function() {
  $('head').append('<script type="text/javascript" src="/assets/vitality.js"></script>');
}