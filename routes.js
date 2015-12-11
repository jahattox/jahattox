Router.configure(
	{
		layoutTemplate: 'main',
		notFoundTemplate: '404'
	}
);

Router.route('/', {
    template: 'homePage'
});