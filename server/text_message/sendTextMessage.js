Meteor.methods({
	sendTextMessage: function (number) {
		var message = "Hello! This is an text message generated 100% programmatically from http://jahattox.com.";
		
		//var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);
		
		if (true) {
		  HTTP.call(
		    "POST",
		    'https://api.twilio.com/2010-04-01/Accounts/' + 
		    Meteor.settings.TWILIO_ACCOUNT_SID + '/SMS/Messages.json', {
		      params: {
		        From: Meteor.settings.TWILIO_NUMBER,
		        To: number,
		        Body: message
		      },
		      // Set your credentials as environment variables 
		      // so that they are not loaded on the client
		      auth:
		        Meteor.settings.TWILIO_ACCOUNT_SID + ':' +
		        Meteor.settings.TWILIO_AUTH_TOKEN
		    },
		    // Print error or success to console
		    function (error) {
		      if (error) {
		        console.log(error);
		      }
		      else {
		        console.log('SMS sent successfully to ' + number + '.');
		      }
		    }
		  );
		}
	}
});