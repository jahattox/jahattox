(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/okgrow_analytics/server/browser-policy.js                   //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
if (Package["browser-policy-common"]) {                                 // 1
  var content = Package['browser-policy-common'].BrowserPolicy.content;
  if (content) {                                                        // 3
    content.allowOriginForAll("www.google-analytics.com");              // 4
    content.allowOriginForAll("cdn.mxpnl.com");                         // 5
  }                                                                     // 6
}                                                                       // 7
                                                                        // 8
//////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/okgrow_analytics/server/publications.js                     //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
Meteor.publish(null, function() {                                       // 1
  if(this.userId) {                                                     // 2
    var self = this;                                                    // 3
    var query = Meteor.users.find(                                      // 4
      {_id: this.userId},                                               // 5
      {fields: {                                                        // 6
                  emails: 1,                                            // 7
                  'services.facebook.email': 1,                         // 8
                  'services.google.email': 1,                           // 9
                  'services.github.email': 1 }});                       // 10
                                                                        // 11
    Mongo.Collection._publishCursor(query, self, 'analyticsusers');     // 12
    return self.ready();                                                // 13
                                                                        // 14
  } else {                                                              // 15
    this.ready();                                                       // 16
  }                                                                     // 17
});                                                                     // 18
                                                                        // 19
//////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['okgrow:analytics'] = {};

})();

//# sourceMappingURL=okgrow_analytics.js.map
