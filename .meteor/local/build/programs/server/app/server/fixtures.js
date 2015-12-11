(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/fixtures.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (CaseStudies.find().count() === 0) {                                // 1
	CaseStudies.insert({                                                  // 2
		title: 'Books on the Wall',                                          // 3
		url: 'https://booksonthewall.com',                                   // 4
		logo: '/img/logo_books_on_the_wall.png',                             // 5
		description: 'Website Redesign, Ecommerce, SEO & Content Development',
		img: '/img/mockups_books_on_the_wall.png',                           // 7
		altText: 'Books on the Wall Redesign Mockup',                        // 8
		background: '/img/bg-1.jpg',                                         // 9
		rating: 4                                                            // 10
	});                                                                   //
                                                                       //
	CaseStudies.insert({                                                  // 13
		title: 'English Language Institute at Texas A&M University',         // 14
		url: 'https://eli.tamu.edu',                                         // 15
		logo: '/img/logo_eli.png',                                           // 16
		description: 'Website Redesign, Content Management',                 // 17
		img: '/img/mockups_eli.png',                                         // 18
		altText: 'English Language Institute at Texas A&M University Redesign Mockup',
		background: '/img/bg-1.jpg',                                         // 20
		rating: 4                                                            // 21
	});                                                                   //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=fixtures.js.map
