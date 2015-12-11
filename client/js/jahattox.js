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

Template.main.helpers({
  logoLink: function() {
    return (window.location.pathname === '/' ? '#page-top' : '/');
  },
  pageClass: function() {
    return (window.location.pathname === '/' ? 'navbar-expanded' : 'navbar-subpage');
  }
});

Template.homePage.helpers({
  projects: function () {
    // Show newest projects at the top
    return Projects.find({}, {sort: {createdAt: -1}});
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

Template.project.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Projects.update(this._id, {
      $set: {checked: ! this.checked}
    });
  },
  "click .delete": function () {
    Projects.remove(this._id);
  }
});

function isFilled(str) {
  return str.length > 0;
}

function isEmail(email) {
  return true;
}

Template.contactFormTemplate.events({
  'submit form#contactForm':function(e) {
    e.preventDefault();
    console.log("email being sent");
    var contactForm = $(e.currentTarget),
      fname = contactForm.find('#full-name').val(),
      email = contactForm.find('#email').val(),
      phone = contactForm.find('#phone').val(),
      message = contactForm.find("#message").val();

    //isFilled and isEmail are my helper methods, which checks if variable exists or is email address valid
    if(isFilled(fname) && isFilled(email) && isFilled(phone) && isFilled(message) && isEmail(email)) {
      console.log('entered second portion');
      var dataText = "Message from: " + fname + "\rEmail: " + email + "\rPhone: " + phone + "\rContent:" + message;

      Meteor.call('sendEmail', fname + " " + lname, email, dataText);

      alert("Email sent.");
    } else {
      alert("Email not sent, please try again.");
      return false;
    }
  }
});