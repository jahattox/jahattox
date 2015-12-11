Meteor.methods({
  sendEmail: function (name, email, text) {
    check([name], [String]);
    check([email], [String])
    check([text], [String]);

    this.unblock();

    Email.send({
      to: 'hello@jahattox.com',
      from: email,
      subject: 'New message from ' + name,
      text: text
    });
  }
});