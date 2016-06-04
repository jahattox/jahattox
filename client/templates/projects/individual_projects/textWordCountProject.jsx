import React from 'react';

class TextWordCountProject extends React.Component {
  constructor() {
    super();
    this.state = {
			showContainer: false,
			generalData: { name: '', data: [] },
			alphabeticalData: { name: '', data: [] },
			occurrenceData: { name: '', data: [] }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	componentWillMount() {
		if ( !document.getElementsByClassName('text-word-count').length ) {
			const wordCountStyles = document.createElement('link');
			wordCountStyles.className = 'text-word-count';
			wordCountStyles.rel = 'stylesheet';
			wordCountStyles.type = 'text/css';
			wordCountStyles.href = '/assets/text_word_count.css';
			document.head.appendChild(wordCountStyles);
		}
	}
	handleSubmit(e) { 
		e.preventDefault();

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
		
		var generalArray = [],
			generalData = {};
		generalArray.push(['Word count', 'Unique words']);
		generalArray.push([wordCount, occurrenceResults.length]);
		generalData.name = 'general';
		generalData.data = generalArray;

		var alphabeticalArray = [],
			alphabeticalData = {};
		alphabeticalArray.push(['Word', 'Occurrence']);
		$.each(alphabetizedResults, function(ka, va) {
			alphabeticalArray.push([ka, va]);
		});
		alphabeticalData.name = 'alphabetical';
		alphabeticalData.data = alphabeticalArray;

		var occurrenceArray = [],
			occurrenceData = {};
		occurrenceArray.push(['Word', 'Occurrence']);
		$.each(occurrenceResults, function(i, group) {
			occurrenceArray.push([group[0], group[1]]);
		});
		occurrenceData.name = 'occurrence';
		occurrenceData.data = occurrenceArray;

		var sort = e.target.wordCountPreferences.value;

		this.setState({
			showContainer: true,
			display: sort,
			generalData: generalData,
			alphabeticalData: alphabeticalData,
			occurrenceData: occurrenceData
		});
	}
	render() {
		const project = this.props.project;
		return <div className="page-word-count-container">
			<h1>{project.title}</h1>

			<span dangerouslySetInnerHTML={{__html: project.introDescription}} />
			
			<div className="row">
				<div className="col-xs-8">
					<form id="word-count-form" onSubmit={this.handleSubmit}>
						<div className="row">
							<div className="col-xs-8">
								<textarea type="text" placeholder="Enter text" id="textData"></textarea>
							</div>
							<div className="form-group col-xs-4">
								<select id="wordCountPreferences">
									<option value="alphabetical">Alphabetical</option>
									<option value="occurrence">Occurrence</option>
								</select>
								<button type="submit" id="count-words-btn" className="btn btn-primary">Count Words</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12">
					<div className={this.state.showContainer ? 'word-count-results' : 'word-count-results hidden'}>
						<div className="general-data">
							<h2>General Data</h2>
							<TextWordCountTable tableData={this.state.generalData} />
						</div>
						<div className={this.state.display == 'alphabetical' ? 'alphabetical-counts' : 'alphabetical-counts hidden'}>
							<h2>Word Count (Alphabetical)</h2>
							<TextWordCountTable tableData={this.state.alphabeticalData} />
						</div>
						<div className={this.state.display == 'occurrence' ? 'occurrence-counts' : 'occurrence-counts hidden'}>
							<h2>Word Count (by Occurrence)</h2>
							<TextWordCountTable tableData={this.state.occurrenceData} />
						</div>
					</div>
				</div>
			</div>
		
		</div>
	}
}

class TextWordCountTable extends React.Component {
  constructor(props) {
    super(props);
  }
	render() {
		const tableID = this.props.tableData.name + '-table';
		const tableArray = this.props.tableData.data;
		const tableHeader = tableArray.shift();
		return <table id={tableID} className="table table-striped">
			<thead>
				{tableHeader ? <tr><th>{tableHeader[0]}</th><th>{tableHeader[1]}</th></tr> : ''}
			</thead>
			<tbody>
		      {tableArray.map(function (d, i) {
		      	var firstItem = d[0],
		      		secondItem = d[1];
		      	return <tr key={i}><td>{firstItem}</td><td>{secondItem}</td></tr>
		      })}
			</tbody>
		</table>
	}
}

export default TextWordCountProject;