Meteor.methods({
  sendEmail: function (text) {
    check([text], [String]);

    this.unblock();

    Email.send({
      to: 'support@myClientProject.com',
      from: 'contact@myClientProject.com',
      subject: 'New message from contact form',
      text: text
    });
  }
});