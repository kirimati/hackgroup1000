angular.module('app', ['our.services'])

  .controller('SetCtrl', function($scope, Resources) {
    $scope.set = {};
    $scope.set.picks = [];
    $scope.set.links = [];

    $scope.addSet = function() {
          Resources.sets.save({username: $scope.username}, {set: $scope.set});
    };
  });
