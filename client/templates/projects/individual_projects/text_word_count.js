Template.textWordCountPage.rendered = function() { 	
	if (!$('link.text-word-count').length) {
		$('head').append('<link class="text-word-count" rel="stylesheet" type="text/css" href="/assets/text_word_count.css">');
	}
}

Template.textWordCountPage.events({
	"submit #word-count-form": function(e) { 
		e.preventDefault();
		$('.general-data table, .alphabetical-counts table, .occurrence-counts table').remove();
		var text = e.target.textData.value;
		
		function count(str) {
			str = str.toLowerCase().replace(/--/g, ' ').replace(/[\[\]\/:_;*()!?.,"]+/g, ' ').replace(/\s\'/g, ' ').replace(/\'\s/g, ' ').replace(/\'s\s/g, ' ').replace(/\s\s+/g, ' ');
		  var obj = {};
		  str.split(' ').forEach(function(el, i, arr){
		    obj[el] = obj[el]? ++obj[el] : 1;
		  });
		  return obj;
		}

		var results = count(text);

		var alphabetizedResults = {};
		Object.keys(results).sort().forEach(function(key) {
		  alphabetizedResults[key] = results[key];
		});

		var occurrenceResults = [],
			wordCount = 0;
		for (var word in results) {
			wordCount += results[word];
      occurrenceResults.push([word, results[word]]);
    }
		occurrenceResults.sort(function(a, b) { return b[1] - a[1] });
		
		var generalString = '';
		generalString += '<tr><td><strong>Word count</strong></td><td>' + wordCount + '</td></tr>';
		generalString += '<tr><td><strong>Unique words</strong></td><td>' + occurrenceResults.length + '</td></tr>';
		generalString = '<table class="table table-striped">' + generalString + '</table>';
		$('.word-count-results .general-data').append(generalString);

		var alphabetizedString = '';
		$.each(alphabetizedResults, function(ka, va) {
			alphabetizedString += '<tr><td><strong>' + ka + '</strong></td><td>' + va + '</td></tr>';
		});
		alphabetizedString = '<table class="table table-striped"><tr><th>Word</th><th>Occurrence</th></tr>' + alphabetizedString + '</table>';
		$('.word-count-results .alphabetical-counts').append(alphabetizedString);

		var occurrenceString = '';
		$.each(occurrenceResults, function(i, group) {
			occurrenceString += '<tr><td><strong>' + group[0] + '</strong></td><td>' + group[1] + '</td></tr>';
		});
		occurrenceString = '<table class="table table-striped"><tr><th>Word</th><th>Occurrence</th></tr>' + occurrenceString + '</table>';
		$('.word-count-results .occurrence-counts').append(occurrenceString);

		$('.word-count-results').removeClass('hidden');

		var sort = e.target.wordCountPreferences.value;
		if ( sort === 'alphabetical' ) {
			$('.occurrence-counts').addClass('hidden');
			$('.alphabetical-counts').removeClass('hidden');
		} else {
			$('.alphabetical-counts').addClass('hidden');
			$('.occurrence-counts').removeClass('hidden');
		}

		return false;
	} 
});