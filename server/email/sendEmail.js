Meteor.methods({
  sendEmail: function () {
  	console.log('inside sendEmail');

    this.unblock();

    Email.send({
      to: 'hello@jahattox.com',
      from: 'hello@jahattox.com',
      subject: 'New message from ',
      text: 'text'
    });
  }
});