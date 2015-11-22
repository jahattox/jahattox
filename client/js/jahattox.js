Projects = new Mongo.Collection("projects");
 
Template.body.helpers({
  projects: function () {
    // Show newest projects at the top
    return Projects.find({}, {sort: {createdAt: -1}});
  },
  fullName: function() {
    return "James Austin Hattox";
  },
  tagline: function() {
    return "Web Consultant and Online Business Developer";
  },
  email: function() {
    return "hello@jahattox.com";
  },
  phone: function() {
    return "1-817-776-5317";
  },
  currentYear: function() {
    return new Date().getFullYear();
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

Template.contactFormTemplate.events({
  'submit form#contactForm':function(e) {
    var contactForm = $(e.currentTarget),
      fname = contactForm.find('#full-name').val(),
      email = contactForm.find('#email').val(),
      phone = contactForm.find('#phone').val(),
      message = contactForm.find("#message").val();

    //isFilled and isEmail are my helper methods, which checks if variable exists or is email address valid
    if(isFilled(fname) && isFilled(email) && isFilled(phone) && isFilled(message) && isEmail(email)) {
      var dataText = "Message from: " + fname + "\rEmail: " + email + "\rPhone: " + phone + "\rContent:" + message;

      Meteor.call('sendEmail', dataText);
      //throwAlert is my helper method which creates popup with message
      throwAlert('Email send.', 'success');
    } else {
      throwAlert('An error occurred. Sorry', 'error');
      return false;
    }
  }
});