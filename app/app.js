require('angular/angular.min');
require('angular-material/angular-material.min');
require('angular-animate/angular-animate.min');
require('angular-aria/angular-aria.min');
require('angular-ui-router/');
require('angular-ui-router/release/angular-ui-router.min');
require('angular-route/angular-route.min');

//Create app
var app = angular.module('mahjong', ['ngMaterial', 'ui.router', 'ngRoute'])
    .directive('tile', function(sharedService, tileService) {
        return {
            restrict: 'E',
            templateUrl: 'assets/html/tile.html',
            link: function($scope, elem) {
                elem.bind('click', function() {
                    var elementId = elem[0].id;
                    var elementX = elem[0].getAttribute("xas");
                    var elementY = elem[0].getAttribute("yas");
                    var elementZ = elem[0].getAttribute("zas");

                    //check of dat de geslecteerde tile al in de array zit.
                    for(i = 0; i < sharedService.selectedTilesIds.length; i++) {

                       if(sharedService.selectedTilesIds[i].id == elementId) {
                           //remove id from selectedIds
                            sharedService.selectedTilesIds.splice(i, (i+1));
                           //remove class form element.
                           document.getElementById(elem[0].id).classList.remove("selectedTile");
                           return
                       }
                    }
                    //add selectedTile class to element && add id to selectedIds
                    
                    //check if tile geselecteerd kan worden // if z > niks is.    if x - 1 == niks || x + 1 == niks
                    var canSelected = true;
                    var leftNeighbour = false;
                    var rightNeigbour = false;

                    for(i = 0; i < sharedService.currentGametiles.length; i++) {
                        var tile = sharedService.currentGametiles[i];

                        if((tile.xPos + 2) == 5) {
                        }

                        // er ligt een tegel bovenop de gene die je wil selecteren.

                        if(elementX == tile.xPos || elementX == (tile.xPos -1) || elementX == (tile.xPos +1) ) {
                            if(elementY == tile.yPos || elementY == (tile.yPos -1) || elementY == (tile.yPos +1) ) {
                                if(tile.zPos > elementZ) {
                                    canSelected = false;
                                    break;
                                }
                            }
                        }
                        // elementx - 1 exist || elementx + 1 exist

                        if(elementZ == tile.zPos) {
                            if(elementY == tile.yPos || elementY == (tile.yPos -1) || elementY == (tile.yPos +1)) {
                                if((tile.xPos - 2) == elementX) {
                                    leftNeighbour = true;
                                }
                                if((tile.xPos - 1) == elementX) {
                                    leftNeighbour = true;
                                }

                                if((tile.xPos + 2) == elementX) {
                                    rightNeigbour = true;
                                }
                                if((tile.xPos + 1) == elementX) {
                                    rightNeigbour = true;
                                }
                            }
                        }
                    }

                    if(leftNeighbour == true && rightNeigbour == true) {
                        canSelected = false;
                    }
                    if(canSelected) {
                        sharedService.selectedTilesIds.push({
                            id: elementId,
                            name: document.getElementById(elementId).classList[0]
                        });

                        document.getElementById(elem[0].id).className += " selectedTile";
                    }

                    if(sharedService.selectedTilesIds.length > 1) {
                        //delete classes of all the selected elements
                        for(i = 0; i < sharedService.selectedTilesIds.length; i++) {
                            document.getElementById(sharedService.selectedTilesIds[i].id).classList.remove("selectedTile");
                        }

                        if(sharedService.selectedTilesIds[0].name == sharedService.selectedTilesIds[1].name) {
                            console.log("matchtiles wordt aangeroepen.");
                            document.getElementById(sharedService.selectedTilesIds[1].id).parentElement.removeChild(document.getElementById(sharedService.selectedTilesIds[1].id));
                            document.getElementById(sharedService.selectedTilesIds[0].id).parentElement.removeChild(document.getElementById(sharedService.selectedTilesIds[0].id));
                            tileService.matchTiles(sharedService.currentGame._id ,sharedService.selectedTilesIds[0].id, sharedService.selectedTilesIds[1].id);
                        }

                        //reset array met selectedTiles
                        sharedService.selectedTilesIds = [];
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
app.controller('boardPlayingController', boardPlayingController);

var detailboardController = require('./components/board/detailInfo/detailboard-controller');
app.controller('detailboardController', detailboardController);


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


