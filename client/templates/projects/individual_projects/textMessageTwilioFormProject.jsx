import React from 'react';

class TextMessageTwilioFormProject extends React.Component {
  constructor() {
    super();
    this.state = {
      sending: false,
      submitted: false,
      cssClass: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleSubmit(e) {
		e.preventDefault();

		var number = e.target.phone.value.replace(/\D/g,'');;

		// Check if phone number format is correct (10 digit == without country code, 11 == with country code).
		if ( number !== '' && number.length >= 10 && number.length <= 11 ) {
			if (number.length === 11) {
				if (number.charAt(0) === '1') {
					number = number.substr(1);
				} else {
					this.setState({
						submitted: true,
						cssClass: 'danger',
						message: 'Invalid international country code: your number begins with a country code that is not the U.S. Remove the country code and try submitting again.'
					});
				}
			}

			this.setState({
				sending: true,
				submitted: false
			});

			var self = this;

			Meteor.call('sendTextMessage', number, function(err, data) {

				var emailText = 'Phone number ' + number + ' was sent a text message through the script.';

				Meteor.call('sendEmail', 'James Hattox', emailText);

				self.setState({
					sending: false
				});

				if (err) {
					console.log(err);
					self.setState({
						submitted: true,
						cssClass: 'danger',
						message: 'There was an error encountered sending your message, please check your phone number and try again.'
					});
				} else {
					self.setState({
						submitted: true,
						cssClass: 'info',
						message: 'SMS message successfully sent.'
					});
				}
			});

			e.target.phone.value = '';
		} else {
			this.setState({
				submitted: true,
				cssClass: 'danger',
				message: 'Invalid number of digits: valid U.S. phone numbers can only contain 10 digits, or 11 with the country code.'
			});
		}
	}
	render() {
		const project = this.props.project;
		return <div className="project-text-message-twilio-form-container">
			<h1>{project.title}</h1>

			<span dangerouslySetInnerHTML={{__html: project.introDescription}} />
			
			<div className="col-xs-6">
				<form className="project-text-message-twilio-form" novalidate onSubmit={this.handleSubmit}>
					<div className="control-group row">
						<div className="form-group col-xs-12 floating-label-form-group controls">
							<label>Phone Number</label>
							<input className="form-control" type="text" name="phone" placeholder="Enter Your Phone Number" required data-validation-required-message="Please enter a phone number." />
						</div>
					</div>
					<div className="row">
						{/* Captcha will go here. */}
					</div>
					<div className="row"> 
						<div className="form-group col-xs-12">
							<button className="btn btn-primary" type="submit" disabled={this.state.sending}>{this.state.sending ? 'Sending Text...' : 'Send Text'}</button>
						</div>
					</div>
				</form>

	      {this.state.submitted ? <p className={"row form-submit-message alert alert-" + this.state.cssClass}>{this.state.message}</p> : ''}
			</div>
		</div>
	}
}

export default TextMessageTwilioFormProject;