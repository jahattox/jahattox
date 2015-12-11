Meteor.methods({
  sendEmail: function (name, email, text) {
  	console.log('inside sendEmail');

    this.unblock();

    Email.send({
      to: 'hello@jahattox.com',
      from: email,
      subject: 'New message from ' + name,
      text: text
    });
  }
});