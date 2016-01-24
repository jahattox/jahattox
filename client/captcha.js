Meteor.startup(function() {
    reCAPTCHA.config({
        publickey: Meteor.settings.public.GOOGLE_CAPTCHA_PUBLIC_KEY
    });
});