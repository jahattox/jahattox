(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/jahattox.js                                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.registerHelper('email', function () {                         // 1
  return "hello@jahattox.com";                                         // 2
});                                                                    //
Template.registerHelper('fullName', function () {                      // 4
  return "James Austin Hattox";                                        // 5
});                                                                    //
Template.registerHelper('tagline', function () {                       // 7
  return "Web Consultant and Online Business Developer";               // 8
});                                                                    //
Template.registerHelper('phone', function () {                         // 10
  return "1-817-776-5317";                                             // 11
});                                                                    //
Template.registerHelper('currentYear', function () {                   // 13
  return new Date().getFullYear();                                     // 14
});                                                                    //
                                                                       //
Template.main.helpers({                                                // 17
  logoLink: function () {                                              // 18
    return window.location.pathname === '/' ? '#page-top' : '/';       // 19
  },                                                                   //
  pageClass: function () {                                             // 21
    return window.location.pathname === '/' ? 'navbar-expanded' : 'navbar-subpage';
  }                                                                    //
});                                                                    //
                                                                       //
Template.homePage.helpers({                                            // 26
  projects: function () {                                              // 27
    // Show newest projects at the top                                 //
    return Projects.find({}, { sort: { createdAt: -1 } });             // 29
  }                                                                    //
});                                                                    //
                                                                       //
Template.body.events({                                                 // 33
  "submit .new-project": function (event) {                            // 34
    // Prevent default browser form submit                             //
    event.preventDefault();                                            // 36
                                                                       //
    // Get value from form element                                     //
    var text = event.target.text.value;                                // 39
                                                                       //
    // Insert a project into the collection                            //
    Projects.insert({                                                  // 42
      text: text,                                                      // 43
      createdAt: new Date() // current time                            // 44
    });                                                                //
                                                                       //
    // Clear form                                                      //
    event.target.text.value = "";                                      // 48
  }                                                                    //
});                                                                    //
                                                                       //
Template.project.events({                                              // 52
  "click .toggle-checked": function () {                               // 53
    // Set the checked property to the opposite of its current value   //
    Projects.update(this._id, {                                        // 55
      $set: { checked: !this.checked }                                 // 56
    });                                                                //
  },                                                                   //
  "click .delete": function () {                                       // 59
    Projects.remove(this._id);                                         // 60
  }                                                                    //
});                                                                    //
                                                                       //
function isFilled(str) {                                               // 64
  return str.length > 0;                                               // 65
}                                                                      //
                                                                       //
function isEmail(email) {                                              // 68
  return true;                                                         // 69
}                                                                      //
                                                                       //
Template.contactFormTemplate.events({                                  // 72
  'submit form#contactForm': function (e) {                            // 73
    console.log("email being sent");                                   // 74
    var contactForm = $(e.currentTarget),                              // 75
        fname = contactForm.find('#full-name').val(),                  //
        email = contactForm.find('#email').val(),                      //
        phone = contactForm.find('#phone').val(),                      //
        message = contactForm.find("#message").val();                  //
                                                                       //
    //isFilled and isEmail are my helper methods, which checks if variable exists or is email address valid
    if (isFilled(fname) && isFilled(email) && isFilled(phone) && isFilled(message) && isEmail(email)) {
      var dataText = "Message from: " + fname + "\rEmail: " + email + "\rPhone: " + phone + "\rContent:" + message;
                                                                       //
      Meteor.call('send_email', dataText);                             // 85
                                                                       //
      alert("Email sent.");                                            // 87
    } else {                                                           //
      alert("Email not sent, please try again.");                      // 89
      return false;                                                    // 90
    }                                                                  //
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
