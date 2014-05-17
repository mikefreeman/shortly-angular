angular.module('shortly', ['ngRoute'])

.controller('linksController', function($scope, $http){
  $scope.orderProp = 'visits';
  $http({method: 'GET', url: '/links'})
    .success(function(data, status, headers, config) {
      $scope.links = data;
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      console.log(headers);
      console.log(config);
    });
})

.controller('shortenController', function($scope, $http){
  $scope.links = [];
  $scope.hideSpinner = true;
  $scope.submitLink = function (url, valid) {
    if(valid){
      $scope.hideSpinner = false;
      $http({method: 'POST', url: '/links', data: {url: url}})
      .success(function(data, status, headers, config) {
        $scope.links.push(data);
        $scope.hideSpinner = true;
      })
      .error(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      });
    }
  };
  $scope.goToLink = function(url, code) {
    $http({method: 'GET', url: url + '/' + code});
  };
})


.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
   .when('/', {
    templateUrl: '../templates/home.html',
    controller: 'linksController'

    })
   .when('/shorten', {
    templateUrl: '../templates/shorten.html',
    controller: 'shortenController'
    });
});

