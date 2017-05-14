'use strict';

angular.module('easybook')
.controller('CadCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH, $location) {

    var cadastroUrl = SERVICE_PATH.PUBLICO_PATH + '/cadastro';

    $scope.cadastro = function (usuario) {
    var usuarioUrl = SERVICE_PATH.PUBLICO_PATH + '/cadastro';
            RestSrv.add(cadastroUrl, usuario, function (newUsuario) {
                ngNotify.set('Usuario \'' + usuario.email + '\' added.', 'success');
                $location.path('/login');
            });
        };

        $scope.cancelar = function(){
            $location.path('/');
        }
});