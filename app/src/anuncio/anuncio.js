'use strict';

angular.module('easybook')
    .controller('AnunCtrl', function ($scope, ngNotify, SERVICE_PATH, RestSrv) {
        $scope.addLivro = false;
        $scope.livro = {};
        $scope.livros = [];

        $scope.show = function () {
            $scope.addLivro = true;
        }
        $scope.hide = function () {
            $scope.addLivro = false;
            $scope.livro={};
        }

         var livroUrl = SERVICE_PATH.PRIVADO_PATH + '/livro';

        $scope.editar = function (livro) {
            $scope.show();
            $scope.livro = angular.copy(livro);
        };

        $scope.remover = function (livro) {
            RestSrv.delete(livroUrl, livro, function () {
                $scope.livros.splice($scope.livros.indexOf(livro), 1);
                ngNotify.set('livro \'' + livro.nome + '\' deleted.', 'success');
            });
        };

        $scope.savelivro = function (livro) {
            RestSrv.add(livroUrl, livro, function (newlivro) {
                if (livro.id) {
                    for (var i = 0; i < $scope.livros.length; i++) {
                        if ($scope.livros[i].id === livro.id) {
                            $scope.livros[i] = livro;
                        }
                    }
                } else {
                    $scope.livros.push(newlivro);
                }
                $scope.hide();
                ngNotify.set('livro \'' + livro.nome + '\' added.', 'success');
            });
        };

        RestSrv.find(livroUrl, function (data) {
            $scope.livros = data;
            //ngNotify.set('Loaded livros with success.', 'success');
        });


        $scope.imageBase = function () {
            var reader = new window.FileReader();
            reader.readAsDataURL($scope.livro.imagem);
            reader.onloadend = function () {
                var base64data = reader.result;
                var image = base64data;
                var clip = image.split(",");
                $scope.livro.imagem = clip[1];
            }
        }
    });