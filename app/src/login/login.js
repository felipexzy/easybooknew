'use strict';

angular.module('easybook')
  .controller('LogCtrl', function($scope, LoginLogoutSrv) {

    $scope.login = function(email, senha) {
      LoginLogoutSrv.login(email, senha);
    };

  });