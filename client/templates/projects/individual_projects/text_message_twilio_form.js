Template.textMessageFormTwilioPage.events({
	"submit .project-text-message-twilio-form": function(e) {
		var number = e.target.phone.value.replace(/\D/g,''),
			form = $(e.currentTarget),
			error = false;

		var captchaData = grecaptcha.getResponse();

		// Check if phone number format is correct (10 digit == without country code, 11 == with country code).
		if ( number !== '' && number.length >= 10 && number.length <= 11 ) {
			if (number.length === 11) {
				if (number.charAt(0) === '1') {
					number = number.substr(1);
				} else {
					appendMessageToForm(form, 'danger', "Invalid international country code: your number begins with a country code that is not the U.S. Remove the country code and try submitting again.");
				}
			}

			if (!error) {
				Meteor.call('sendTextMessage', number, captchaData, function(err, data) {
					grecaptcha.reset();

					var emailText = 'Phone number ' + number + ' was sent a text message through the script.';

					Meteor.call('sendEmail', 'James Hattox', emailText);

					if (err) {
						console.log(err);
						appendMessageToForm(form, 'danger', 'There was an error encountered sending your message, please check your phone number and try again.');
					} else {
						appendMessageToForm(form, 'info', 'SMS message successfully sent.');
					}
				});
				e.target.phone.value = '';
			}
		} else {
			appendMessageToForm(form, 'danger', 'Invalid number of digits: valid U.S. phone numbers can only contain 10 digits, or 11 with the country code.');
		}

		return false;
	}
})