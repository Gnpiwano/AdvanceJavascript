module.exports = function($scope, menuService, gameboardService, authService, gameService, sharedService, $compile, $element, $stateParams) {

    this.dataLoaded = false;
    this.shared = sharedService;
    var gameId = $stateParams.boardId;
    var _th = this;

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

}