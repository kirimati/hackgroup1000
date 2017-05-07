angular.module("app", [])
  .controller("head", function($scope){
    $scope.pageTitle = "Group1000";
  })
  .controller("index", function($rootscope, $scope){
    $scope.playListTitle = "Coucou";
    $rootscope.logged = false;
    $scope.email = "";
    $scope.pwd = "";
    // $scope.auth = function() {
    //   var email = "ibalex.salino@gmail.com";
    //   var pwd = "coucou";
    //   if (angular.equals($scope.email, email) && angular.equals($scope.pwd, pwd)){
    //     $rootscope.logged = true;
    //   }
    // }
  })

  .controller("navbar", function($scope){
    $scope.barTitle = "Group1000";
  })

  .controller("footer", function($scope){
  });
