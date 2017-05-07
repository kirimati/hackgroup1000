angular.module('app', ['our.services'])

  .controller('SetCtrl', function($scope, Resources) {
    $scope.set = {};
    $scope.set.picks = [];
    $scope.set.links = [];

    $scope.addSet = function(myname) {
      Resources.sets.save({username: myname}, {set: $scope.set});
    };
  });
