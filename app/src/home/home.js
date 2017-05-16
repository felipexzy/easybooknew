'use strict';

angular.module('easybook')
.controller('HomeCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH, $http) {
    $scope.livros = [];
    $scope.title = '';
    $scope.livro ={};
    $scope.pagination = {};
    $scope.totalPages = [];

  var livroUrl = SERVICE_PATH.PUBLICO_PATH + '/';

 RestSrv.find(livroUrl + 'list?page=0&size=9&sort=id', function(data) {
        $scope.livros = data.content;
        $scope.pagination = data;
        for(var i = 0; i < $scope.pagination.totalPages; i++){
          $scope.totalPages.push(i);
          
        }
      });
    
    $scope.buscarinf=function(livro){
    $scope.livro={};
    $scope.livro = angular.copy(livro);
    }
    
    $scope.finByTitle = function(){
      if($scope.title){
        RestSrv.find(livroUrl +'buscar/'+ $scope.title, function(data) {
            $scope.livros = data;
        });
      }
    }
    
     $scope.findPagination = function(page) {
        RestSrv.find(livroUrl + 'list?page='+ page +'&size=9&sort=id', function(response) {
           $scope.livros = response.content;

        });
      };

    $scope.backspace = function(event){
      if($scope.title){
        RestSrv.find(livroUrl +'buscar/'+ $scope.title, function(data) {
            $scope.livros = data;
        });
      }else{
        if (event.keyCode === 8) {
                RestSrv.find(livroUrl + 'list?page=0&size=9&sort=id', function(data) {
                $scope.livros = data.content;
                $scope.pagination = data;
              });
        }
      }
    }

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