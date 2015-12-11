(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/case_studies/case_studies_list.js                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.caseStudiesList.helpers({                                     // 1
	caseStudies: function () {                                            // 2
		return CaseStudies.find();                                           // 3
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
