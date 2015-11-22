Meteor.startup(function(){
	process.env.MAIL_URL = 'smtp://boo.foo@awesomedomain.com:superDooperPassword@smtp.gmail.com:587/'
});