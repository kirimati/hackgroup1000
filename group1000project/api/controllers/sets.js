
// findable on my Algolia account (tpriou)
var applicationID = '2P420325U0';
var apiKey = 'c21f22088889008bed131a7130664057';

var algoliasearch = require('algoliasearch');
var client = algoliasearch('applicationID', 'apiKey');

module.exports = {
      postUserSet
}

// POST /sets/{username}
function postUserSet(req, res, next) {
      var object = {
            title: 'Mon titre',
            tag: 'music',
            username: 'toto',
            abstract: 'There are some freaking pizzas left',
            pick: [],
            links: []
      };
}
