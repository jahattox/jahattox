(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/email/send_email.js                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.methods({                                                       // 1
  sendEmail: function (name, email, text) {                            // 2
    check([name], [String]);                                           // 3
    check([email], [String]);                                          // 4
    check([text], [String]);                                           // 5
                                                                       //
    this.unblock();                                                    // 7
                                                                       //
    Email.send({                                                       // 9
      to: 'hello@jahattox.com',                                        // 10
      from: email,                                                     // 11
      subject: 'New message from ' + name,                             // 12
      text: text                                                       // 13
    });                                                                //
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=send_email.js.map
