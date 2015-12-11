Meteor.methods({
  sendEmail: function (name, text) {

    this.unblock();

    Email.send({
      to: 'hello@jahattox.com',
      from: 'hello@jahattox.com',
      subject: 'New message from ' + name,
      text: text
    });
  }
});