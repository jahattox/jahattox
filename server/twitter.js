Meteor.startup(function () {
  Future = Npm.require('fibers/future');
});

Meteor.methods({
	getTweetsByHashtag: function (term, numNodes) {
		var Twit = Meteor.npmRequire('twit');

    var myFuture = new Future();
		
		var T = new Twit({
			consumer_key: 'PWz1icoBviYaKLvIiZc3pgzbm',
			consumer_secret: 'ODqcZQA0FWMVT2QpsFftYnR7Gx5jYtcFDWYIdLBDgZ6vuA05Fx',
			access_token: '4720261172-XY4QlOIc9Kb4dNTW2oh6c60vh0MxNFesMQBFYIk',
			access_token_secret: 'vDbMqP23t4GXJZrZLVmExRLyfjDlyvTc9egin35DW09Im'
		});

		var today = new Date(),
			day = today.getDate(),
			month = today.getMonth(),
			year = today.getFullYear(),
			fullDate = year + '-' + month + '-' + day;

	  T.get('search/tweets',
	  	{
				q: term + ' since:' + fullDate,
				count: numNodes
			}, 
			function (err, data) {
		    if (err) {
		    	console.log(err);
		    } else {
		      myFuture['return'](data);
		    }
    	}
    );

    return myFuture.wait();
	}
});