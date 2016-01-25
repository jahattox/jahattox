Template.oneHundredYearsSolitudeD3jsGraphPage.rendered = function() {
	if (!Session.get('OneHundredYearsSolitudeD3jsGraph')) {
		Session.set('OneHundredYearsSolitudeHasAppend', true);
		$('head').append('<link rel="stylesheet" type="text/css" href="/assets/one_hundred_years_solitude.css">');
	}
}