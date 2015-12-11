(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/smtp.js                                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.startup(function () {                                           // 1
	process.env.MAIL_URL = 'smtp://hello@jahattox.com:Ada12oogoog@@smtp.gmail.com:587/';
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=smtp.js.map
