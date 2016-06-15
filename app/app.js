require('angular/angular.min');
require('angular-material/angular-material.min');
require('angular-animate/angular-animate.min');
require('angular-aria/angular-aria.min');
require('angular-ui-router/');
require('angular-ui-router/release/angular-ui-router.min');
require('angular-route/angular-route.min');
require('angular-resource/angular-resource.min');

//Create app
//var io = require('socket.io');

var app = angular.module('mahjong', ['ngMaterial', 'ui.router', 'ngRoute', 'ngResource'])
    .directive('tile', function(tileService, sharedService, authService) {
        return {
            restrict: 'E',
            templateUrl: 'assets/html/tile.html',
            link: function($scope, elem) {
                elem.bind('click', function() {
                    var spectating = true;
                    sharedService.currentGame.players.forEach(function (player) {

                        if(player._id == authService.login.username) {
                            spectating = false;
                        }
                    });

                    if(sharedService.currentGame.state == "finished") {
                        spectating = true;
                    }

                    if(spectating) {
                        return;
                    }

                    var elementId = elem[0].id;
                    var elementX = elem[0].getAttribute("xas");
                    var elementY = elem[0].getAttribute("yas");
                    var elementZ = elem[0].getAttribute("zas");

                    //check of dat de geslecteerde tile al in de array zit.
                    if(tileService.checkIfTileIsAlreadySelected(elementId)) {
                        //remove id from selectedIds
                        tileService.selectedTilesIds.splice(i, (i+1));
                        //remove class form element.
                        document.getElementById(elementId).classList.remove("selectedTile");
                        return;
                    }

                    if(tileService.checkIfTileCanBeSelectedMajongRules(elementX, elementY, elementZ, elementId)) {
                        tileService.selectedTilesIds.push({
                            id: elementId,
                            name: document.getElementById(elementId).getAttribute("name"),
                            suit: document.getElementById(elementId).getAttribute("suit"),
                            matchesWholeSuit: document.getElementById(elementId).getAttribute("matchesWholeSuit")
                        });

                        document.getElementById(elementId).className += " selectedTile";
                    }

                        if(tileService.selectedTilesIds.length > 1) {
                            //delete classes of all the selected elements
                            for(i = 0; i < tileService.selectedTilesIds.length; i++) {
                                document.getElementById(tileService.selectedTilesIds[i].id).classList.remove("selectedTile");
                            }

                            if(tileService.selectedTilesIds[0].matchesWholeSuit != "true") {
                                console.log("suit" + name);
                                var fullName1 = tileService.selectedTilesIds[0].suit + tileService.selectedTilesIds[0].name;
                                var fullName2 = tileService.selectedTilesIds[1].suit + tileService.selectedTilesIds[1].name;
                            } else {
                                console.log("only suit");
                                var fullName1 = tileService.selectedTilesIds[0].suit;
                                var fullName2 = tileService.selectedTilesIds[1].suit;
                            }
                            console.log(fullName1 +" ==" + fullName2);
                            if(fullName1 == fullName2) {
                                console.log("matchtiles wordt aangeroepen.");
                                console.log(tileService.selectedTilesIds[1].id);
                                document.getElementById(tileService.selectedTilesIds[1].id).parentElement.removeChild(document.getElementById(tileService.selectedTilesIds[1].id));
                                document.getElementById(tileService.selectedTilesIds[0].id).parentElement.removeChild(document.getElementById(tileService.selectedTilesIds[0].id));
                                tileService.matchTiles(sharedService.currentGame._id ,tileService.selectedTilesIds[0].id, tileService.selectedTilesIds[1].id);
                            }
                            //reset array met selectedTiles
                            tileService.selectedTilesIds = [];
                        }

                    if(!tileService.checkIfMatchingIsPossible()) {
                        alert("there are no matches anymore!");
                    }
                });
            }
        }
    }).directive('gameboard', function() {
        return {
            restrict: 'E',
            templateUrl: 'assets/html/gameboard.html'
        };
    });

//app.io = require('socket.io')(app.start());

// create controllers
var loginController = require('./components/login/login-controller');
app.controller('loginController', loginController);

var mainController = require('./components/main/main-controller');
app.controller('mainController', mainController);

var testController = require('./components/tests/test-controller');
app.controller('testController', testController);

//var testController = require('./components/tests/test-controller');
//app.controller('testController', testController);

var boardController = require('./components/board/board-controller');
app.controller('boardController', boardController); //boardPlayingController

var boardPlayingController = require('./components/board/playingBoard/playingboard-controller');
app.controller('boardPlayingController', boardPlayingController);

var detailboardController = require('./components/board/detailInfo/detailboard-controller');
app.controller('detailboardController', detailboardController);

//create factory



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

var tileService = require('./shared/tile-service');
app.service("tileService", tileService);

var gameboardService = require('./shared/gameboard-service');
app.service('gameboardService', gameboardService);

var socketService = require('./shared/socket-service');
app.service('socketService', socketService);


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
        title: "Board Page",
        controller: "detailboardController",
        controllerAs: "ctrl"
    })
    .state("board.playingBoard", {
        url: "",
        templateUrl: "../../components/board/playingBoard/index.html",
        title: "Board Page",
        controller: "boardPlayingController",
        controllerAs: "ctrl"
    });   
}]);


