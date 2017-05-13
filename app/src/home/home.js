'use strict';

angular.module('easybook')
.controller('HomeCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH, $http) {
    $scope.livros = [];
    $scope.livro = {};

  var livroUrl = SERVICE_PATH.PUBLICO_PATH + '/';

 RestSrv.find(livroUrl, function (data) {
            $scope.livros = data;
            //ngNotify.set('Loaded livros with success.', 'success');
        });

    $scope.listarPorNome = function(nome){
     RestSrv.find(livroUrl + "buscar/" + $scope.livro.nome, function (data) {
            $scope.livros = data;
            //ngNotify.set('Loaded livros with success.', 'success');
        });
    }
    
    $scope.hasAnyPermission = function(authorities) {
      var hasPermission = false;
        
      $rootScope.authDetails.permissions.forEach(function(permission) {
        authorities.forEach(function(authority) {
          if (permission.authority === authority) {
            hasPermission = true;
          }
        });
      });

      return hasPermission;
    };

});