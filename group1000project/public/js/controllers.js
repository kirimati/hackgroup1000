angular.module('app', ['our.services'])

  .controller('setCtrl', function($scope, Resources) {
    $scope.set = {};
    $scope.set.picks = [];
    $scope.set.links = [];

    $scope.addSet = function() {
          Resources.sets.save({username: $scope.username}, {set: $scope.set});
    };
  });
