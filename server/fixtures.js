if (CaseStudies.find().count() === 0) {
	CaseStudies.insert({
		title: 'Books on the Wall',
		url: 'https://booksonthewall.com',
		logo: '/img/logo_books_on_the_wall.png',
		description: 'Website Redesign, Ecommerce, SEO & Content Development',
		img: '/img/mockups_books_on_the_wall.png',
		altText: 'Books on the Wall Redesign Mockup',
		background: '/img/bg-1.jpg',
		rating: 4
	});

	CaseStudies.insert({
		title: 'English Language Institute at Texas A&M University',
		url: 'https://eli.tamu.edu',
		logo: '/img/logo_eli.png',
		description: 'Website Redesign, Content Management',
		img: '/img/mockups_eli.png',
		altText: 'English Language Institute at Texas A&M University Redesign Mockup',
		background: '/img/bg-1.jpg',
		rating: 4
	});
}