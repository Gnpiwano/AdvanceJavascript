module.exports = function($scope, menuService, gameboardService, authService, gameService, sharedService, $compile, $element, $stateParams) {

    this.dataLoaded = false;
    this.shared = sharedService;
    var gameId = $stateParams.boardId;
    var _th = this;

    var cssFiles = [
        "./../assets/css/tiles2.css",
        ""
    ];

    this.cssFile = "";

    this.init = function () {
        authService.checkIfUserIsLogedIn();

        sharedService.loading = true;
        if(sharedService.currentGame._id != gameId) {
            gameboardService.getGameBoard(gameId, function (game, gameTiles, matchedTiles) {
                sharedService.loading = false;
                sharedService.currentGame = game;
                sharedService.currentGametiles = gameTiles;
                sharedService.currentMatchingGameTiles = matchedTiles;
                _th.dataLoaded = true;
            });

        }else {
            sharedService.loading = false;
            _th.dataLoaded = true;
        }
    }

    var getTilesCompletionHandler = function(response) {
        console.log("Response Data: ", response);

    }

    this.changeStyle = function () {

        if(_th.cssFile == "") {
            _th.cssFile = "./../assets/css/tiles2.css";
        }else {
            _th.cssFile = "";
        }

    }
}