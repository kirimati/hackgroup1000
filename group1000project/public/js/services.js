angular.module('starter.services', ['ngResource'])

  // defines all routes
  .factory('Resources', function($resource) {
    var hostname = 'http://127.0.0.1:3000';
    return {
          sets: $resource(hostname.concat('/api/sets/:username');
   };
  })
