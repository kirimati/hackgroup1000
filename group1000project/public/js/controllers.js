angular.module('app', ['services'])

  .controller("head", function($scope) {
    $scope.pageTitle = "Group1000";
  })

  .controller("setCtrl", function($scope, Resources) {
    $scope.set = {};

    $scope.addSet = function(username) {
      Resources.sets.save({username: username}, {set: $scope.set}, function() {
            console.log('please refresh');
            //$state.go("#", {}, {reload: true});
      });
    };
  })

  .controller("navbar", function($scope){
    $scope.barTitle = "Group1000";
  });
