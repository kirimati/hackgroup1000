angular.module("app", [])
  .controller("head", function($scope){
    $scope.pageTitle = "Group1000";
  })

  .controller("setCtrl", function($scope, Resources) {
    $scope.set = {};

    $scope.addSet(username) {
      Resources.save({username: username}, {set: $scope.set}, function() {
            $state.go("tab.friend", {}, {reload: true});
      });
    }

 })

  .controller("navbar", function($scope){
    $scope.barTitle = "Group1000";
  })
