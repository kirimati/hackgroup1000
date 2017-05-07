angular.module('app', ['services'])

  .controller("setCtrl", function($scope, Resources) {
    $scope.set = {};
    $scope.set.picks = [];
    $scope.set.links = [];

    $scope.addSet = function(username) {
      Resources.sets.save({username: username}, {set: $scope.set}, function() {
            console.log('please refresh');
            //$state.go("#", {}, {reload: true});
      });
    };
  });
