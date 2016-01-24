Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: Meteor.settings.GOOGLE_CAPTCHA_SECRET_KEY
    });
});