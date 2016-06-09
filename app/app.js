require('angular/angular.min');
require('angular-material/angular-material.min');
require('angular-animate/angular-animate.min');
require('angular-aria/angular-aria.min');
require('angular-ui-router/');
require('angular-ui-router/release/angular-ui-router.min');
require('angular-route/angular-route.min');

//Create app
var app = angular.module('mahjong', ['ngMaterial', 'ui.router', 'ngRoute'])
    .directive('tile', function() {
        return {
            restrict: 'E',
            templateUrl: 'assets/html/tile.html'
        };
    }).directive('gameboard', function() {
        return {
            restrict: 'E',
            templateUrl: 'assets/html/gameboard.html'
        };
    });

// create controllers
var loginController = require('./components/login/login-controller');
app.controller('loginController', loginController);

var mainController = require('./components/main/main-controller');
app.controller('mainController', mainController);

var testController = require('./components/tests/test-controller');
app.controller('testController', testController);

var testController = require('./components/tests/test-controller');
app.controller('testController', testController);

var boardController = require('./components/board/board-controller');
app.controller('boardController', boardController); //boardPlayingController

var boardPlayingController = require('./components/board/playingBoard/playingboard-controller');
app.controller('boardPlayingController', boardPlayingController); //boardPlayingController


// create services
var sharedService = require('./shared/shared-service');
app.service('sharedService', sharedService);

var dataService = require("./shared/data-service");
app.service("dataService", dataService);

var gameService = require('./shared/game-service');
app.service('gameService', gameService);

var authService = require('./shared/auth-service');
app.service("authService", authService);

var menuService = require('./shared/menu-service');
app.service("menuService", menuService);




// app routes
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
  
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("main", {
        url: "/main",
        templateUrl: "../../components/main/main.html",
        title: "Main Page",
        controller: "mainController",
        controllerAs: "ctrl"
    })
    .state("test", {
        url: "/test",
        templateUrl: "../../components/tests/main.html",
        title: "Test Page",
        controller: "testController",
        controllerAs: "ctrl"
    })
    .state("login", {
        url: "/",
        templateUrl: "../../components/login/login.html",
        title: "Login Page",
        controller: "loginController",
        controllerAs: "ctrl"
    })
    .state("board", {
        url: "/board?boardId",
        templateUrl: "../../components/board/board.html",
        title: "Board Page",
        controller: "boardController",
        controllerAs: "ctrl"
    })
    .state("board.detailedInfo", {
        url: "",
        templateUrl: "../../components/board/detailInfo/index.html",
        title: "Board Page"
    })
    .state("board.playingBoard", {
        url: "",
        templateUrl: "../../components/board/playingBoard/index.html",
        title: "Board Page",
        controller: "boardPlayingController",
        controllerAs: "ctrl"
    });   
}]);


