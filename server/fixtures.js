CaseStudies.remove({});
Projects.remove({});

if (CaseStudies.find().count() === 0) {
	CaseStudies.insert({
		title: 'Books on the Wall',
		url: 'https://booksonthewall.com',
		logo: '/img/logo_books_on_the_wall.png',
		description: 'Website Redesign, eCommerce, SEO & Content Development',
		img: '/img/mockups_books_on_the_wall.png',
		altText: 'Books on the Wall Redesign Mockup',
		background: '/img/bg-2.jpg',
		problem: '<p><strong>Books on the Wall is a small poster printing company I had started in college and used as a springboard to learn web development.</strong> Having undergone a handful of design iterations in its first year, I put the project on the backburner once I graduated from university and began working and developing websites full time. Though I continued selling posters and maintaining the business, the website really began to show its age and needed a face lift.</p><p>The backend software version with which I had originally set the website up was also no longer maintained by the company (Lemonstand), and was lacking many core ecommerce features. Additionally, I had fallen behind on the blog content production side of things, and as a result the main website\'s sales fell well below that of Books on the Walls\' performance on other marketplaces (Amazon, Etsy, RedditGifts, etc.). If I was going to bring in customers, I needed a sound content strategy to help the website rank well in Google searches for books and reading materials.</p>',
		solution: '<p>The first major consideration was which ecommerce software to use to manage orders and oversee inventory. After shopping around all the available options, I landed on using a WordPress base integrated with WooCommerce for product management -- WooCommerce for its versatility, and WordPress for its emphasis on content and my past experience with the platform. With the backbone of the website in place, I was ready to begin working on the website\'s frontend design.</p><p>I liked the logo and color scheme for Books on the Wall, so rather than completely rework the base branding I decided to focus on improving the layout and overall feel of the website. In particular, I wanted to improve the home/landing page, the product pages, and the blog page. Along with a good design, I wanted to put a strong emphasis on the mobile layout for the website to ensure it worked equally well on all devices (desktop, laptop, tablet, mobile phone, etc.).</p><p>The home page needed a lot of work: the previous version was just the product list with pictures and prices. I had received a lot of questions regarding what the posters actually were upon a customer\'s first store visit, so I had a graphic created that highlighted the composition of the posters. I moved the full product list to a subpage, and opted to use the home page as a more information-based landing page. Along with the graphic described above, I added a selection of three posters from our top ten best sellers, with a \"see all products\" call-to-action button directly below. Beneath that, I added two customer reviews so that potential customers could see what previous customers were saying, along with a list of website logos from which the posters were also being sold (Amazon, Etsy, etc.).</p><p>The product page was also in dire need of a makeover. The old version had all the necessary information (picture, description, etc.), but it wasn\'t very aesthetically pleasing and didn\'t look as professional as I\'d hoped. To start things off, I created four new sets of photos for each poster, showing off the product in different ways to maximize customer engagement and minimize possible questions. Customers could now zoom-in on product photos, as well as cycle between all four. I also revamped how the product specs were shown, using a boxed-off area with the "Add to cart" button included beneath the product information. Rounding off the product page, I added a brief description below the photos and specs.</p>',
		slug: 'books-on-the-wall',
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
		problem: '<p><strong>The English Language Institute at Texas A&M University (ELI) had a straightforward, but painful problem: they had no real means of making content adjustments on their website.</strong> Accepting hundreds of international students each year, ELI is required to keep up to date with a constantly changing U.S. immigration procedure. Many international students make first contact with ELI on the internet, and use their website as a portal for information. Any time ELI needed to make adjustments to their website, they were forced to edit the HTML files by hand, which was time consuming, confusing, and error prone. They needed a solution that streamlined the process, and they wanted all employees to be able to make changes without requiring familiarity with HTML syntax or the cumbersome editing process.</p><p>In addition to being able to change content on the fly, ELI wanted a completely new look for their website. They wanted an update to their brand colors, as well as a restructured site map to ensure their pages were laid out in a logical and accessible way. Their old website wasn\'t mobile friendly, and they knew it was a hassle to use when viewing it on a tablet or phone. Though mobile device use is estimated to be over 60% of all internet use, ELI\'s website was a bit of a chore to use on phones and tablets and they wanted to ensure that the website was easy to use regardless of device.</p>',
		solution: '<p>Realizing the need for a modernized web presence, ELI reached out and we started laying the foundation of their new website. We began with trying to pin down the overall content structure -- which pages should be in the navigation bar, and which pages should be subpages of others. Besides the home, about, and FAQ pages, ELI wanted to incorporate two separate groups of pages that corresponded to current and future students. They also wanted a centralized list of all teachers and ELI staff including name, picture, room number, and short bio to make it easier for students to find information on their instructors.</p><p>Central to a website\'s development, we made it a priority to make the website responsive so that it would work equally well on desktop, mobile, and other variable screen width devices. Realizing the value informational articles could impart to students, we also set up a blog area on the website. As an added bonus, beyond providing a centralized area for articles, maintaining a blog also helps immensely with search engine optimization.</p><p>For the home page, they had three requests: they wanted a slider with pictures of the students, a list of the latest blog posts, and an area featuring a video ELI had previously created. After creating the home page as previously outlined, I also configured the slider to be editable by ELI staff.</p><p>Their most requested feature, however, was a new student application form that would allow a prospective student to submit an application directly through the ELI website. Rather than requiring a lengthy email correspondence or going through the mail, an application form would greatly streamline the student onboarding process. ELI staff drafted up a short list of all the information they\'d normally request of a prospective student, and I set to work creating their application form. Once everything was in place, I configured the form to generate a CSV file containing all the student submitted information and to send that file to the ELI email address.</p><p>In addition to the new student application form, ELI wanted a few extra website features to help potential students. At their request, we created a cost calculator which provided a rough estimate for program costs given the number of desired semesters and program add-ons. We also created a weather forecast widget, which showed the current and upcoming forecast for the College Station area. Finally, I set up a student events calendar that synced with ELI\'s Google Calendar account, allowing students to see upcoming ELI and TAMU events through the ELI website.</p>',
		slug: 'english-language-institute-tamu',
		rating: 4
	});

	CaseStudies.insert({
		title: 'Eye Trends (College Station)',
		url: 'http://eyetrendscollegestation.com',
		logo: '/img/logo_eye_trends.png',
		description: 'Website Redesign, Content Management',
		img: '/img/mockups_eye_trends.png',
		altText: 'Eye Trends (College Station) Redesign Mockup',
		background: '/img/bg-3.jpg',
		problem: '<p><strong>Eye Trends had a functional, though completely dated website.</strong> Their website worked fine, but aesthetically it looked like it had been created a decade earlier. Additionally, though Eye Trends staff understood how to make changes to their static HTML website files, the process was overly cumbersome and could\'ve been vastly simplified with the introduction of a dedicated content management system. Eye Trends wanted a facelift, and they needed a way to streamline the adjustment of content on their website.</p><p>Their website also wasn\'t responsive, and was difficult to navigate on tablets, phones, and other mobile devices. They realized they were making it harder for their mobile customers to use their website, and pushing away potential clients. Additionally, Eye Trends had previously invested time and effort into their search engine optimization (SEO) campaigns, and were worried about their search engine rankings. Changes made to their website would have to be implemented in such a way that their search engine position would stay the same after migration.</p>',
		solution: '<p>After meeting Dr. Shini to get a glasses prescription, Eye Trends approached me to refresh their website design and set up a content management platform. I chose WordPress as the backend base, as it offers a wealth of flexibility while still providing an intuitive and extendable dashboard through which Eye Trends employees could manage their website. With the website\'s core in place, we set to work filling out the website\'s finer details.</p><p>Starting out, I worked with Eye Trends\' manager to determine which pages should be included and what their purpose might be. Once we had a rough road map to work from, I began drafting up templates for the requested pages. Keeping in mind their need for a responsive website, I incorporated a number of informational elements into their footer: business hours, so customers could easily see when they could come in for a consultation; a Google maps widget, to help with locating the office; and social media links for all of their social media accounts on various platforms.</p><p>On the home page, they wanted a slider as well and informational area with a small bio featuring Dr. Shini. With an eye on their future SEO ranking, they also wanted a blog page where they could produce new content and target specific search keywords within the College Station area. The blog posts needed to have a prominent area for large images, so as to make the blog page more engaging with a little more \"pop\". We also added prominent links to their social media outlets in the sidebar, as well as a \"most recent pictures\" section containing the thumbnails of their eight most recent posts.</p><p>Once the blog and home page were in place, I moved to the website\'s secondary pages. Eye Trends wanted to keep many of the same features present on the old website, but with an updated aesthetic and improved interface. Both the FAQ and Insurance pages contained accordions in a question/answer format, and I re-implemented that functionality but with an improved look and smoother transition animation. They also had a contact form on their previous website, which I updated and re-configured to forward on to their current email address. Finally, their last major layout request was the frames page, from which they could upload new frame line images and links to show off their constantly changing inventory.</p><p>Once I had received all content for the website, I set to work filling in all the pages with the correct copy. We went through a few iterations before Eye Trends was pleased with the layout of the text, but once they settled on a good launch version we were ready to go. With everything else complete, I reviewed the old link structure for the website and set up 301 redirects so that the new pages would retain their previously earned SEO value.</p>',
		slug: 'eye-trends-college-station',
		rating: 4
	});
}

if (Projects.find().count() === 0) {
	Projects.insert({
		title: 'Automated Text Message Form',
		titleTagline: 'Built with Twilio',
		img: '/img/text_message_twilio_form_thumbnail.png',
		altText: 'Text Message Form with Twilio',
		slug: 'text-message-twilio-form',
		template: 'textMessageFormTwilioPage',
		introDescription: "<p>Enter your phone number (U.S. only, please!) and hit send to have an automated text message sent from my phone to yours.</p>",
		rating: 5
	});

	Projects.insert({
		title: '"One Hundred Years of Solitude" Family Tree',
		titleTagline: 'Created with D3.js',
		img: '/img/one_hundred_years_solitude_d3js_graph_thumbnail.png',
		altText: '"One Hundred Years of Solitude" Family Tree D3.js Graph',
		slug: 'one-hundred-years-solitude-d3js-graph',
		template: 'oneHundredYearsSolitudeD3jsGraphPage',
		introDescription: '<p>A D3.js graph of the family members in "One Hundred Years of Solitude". Each orb can be moved around by clicking and dragging, with some light physics thrown in to give the graph some life.</p><div id="solitude-graph"></div><p>Each circle represents a different character, with older generation characters having larger orbs than younger generations. Connections mean either marriage or child, depending on the size of the orb. Blue colored orbs represent members of the Buendia clan, while red orbs stand in for characters who married in to the family.</p>',
		rating: 4
	});

	Projects.insert({
		title: 'D3.js Twitter Force Graph',
		titleTagline: 'Created with D3.js using the Twitter API',
		img: '/img/d3js_twitter_thumbnail.png',
		altText: '',
		slug: 'd3js-twitter-force-graph',
		template: 'd3jsTwitterForceGraphPage',
		introDescription: 'Enter a search term into the field to dynamically generate a graph based on recent Twitter data. The circle color is determined by language, and radius size corresponds with the number of retweets. You can drag and drop nodes, and rolling your mouse over an orb will reveal the underlying tweet information.',
		rating: 5
	});

	Projects.insert({
		title: 'Text Word Count Script',
		titleTagline: 'String analysis using JavaScript',
		img: '/img/text_count_thumbnail.png',
		altText: '',
		slug: 'text-word-count',
		template: 'textWordCountPage',
		introDescription: '<p>Enter a block of text into the field to count the relative word occurrences within the passage.</p>',
		rating: 3
	});
}