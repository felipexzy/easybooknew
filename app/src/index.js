'use strict';

var BASE_URL = 'http://localhost:8080';


angular.module('easybook', ['checklist-model', 'ngNotify', 'ngRoute', 'ngCookies', 'ngStorage', 
                             'ngFileUpload'])
    .constant('SERVICE_PATH', {
        'ROOT_PATH': BASE_URL,
        'PUBLICO_PATH': BASE_URL + '/publico',
        'PRIVADO_PATH': BASE_URL + '/privado'
    })
    .config(function ($routeProvider) {
        $routeProvider.
        when('/', {
                templateUrl: 'src/home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/anuncio', {
                templateUrl: 'src/anuncio/anuncio.html',
                controller: 'AnunCtrl'
            })
            .when('/cadastro', {
                templateUrl: 'src/cadastro/cadastro.html',
                controller: 'CadCtrl'
            })
            .when('/login', {
                templateUrl: 'src/login/login.html',
                controller: 'LogCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

    }).config(function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('httpRequestInterceptor');
    })
    .run(function ($rootScope, ngNotify, LoginLogoutSrv) {
        $rootScope.authDetails = {
            name: '',
            authenticated: false,
            permissions: []
        };
        ngNotify.config({
            theme: 'pastel'
        });
        LoginLogoutSrv.verifyAuth();
    });
