module.exports = function(gameService, tileService) {
    var _th = this;
    var currentGameId = null;

    var game = null;
    var gameTiles = null;
    var matchinTiles = null;
    var completionHandler = null;

    this.getGameBoard = function(gameId, completionHandler) {
        console.log("Er wordt een gameboard opgebouwd. ");
        if(gameId === undefined || completionHandler === undefined) {
            alert("undefined");
            return;
        } else {
            _th.completionHandler = completionHandler;
            getGame(gameId);
            getTiles(gameId);
            getMatchingTiles(gameId);
        }
    }

    var getGame = function (gameId) {
        gameService.getGame(gameId, function (result) {
            _th.game = result.data;
            checkForCompletion();
        })
    }

    var getTiles = function (gameId) {
        gameService.getTilesFromGame(gameId, function (result) {
            _th.gameTiles = result.data;
            checkForCompletion();
        })
    }

    var getMatchingTiles = function (gameId) {
        tileService.getMatchedTilesFromGame(gameId, function (result) {
            _th.matchinTiles = result.data;
            checkForCompletion();
        })
    }

    var checkForCompletion = function () {
        if(_th.game != null && _th.gameTiles != null && _th.matchinTiles != null) {
            console.log("Matching Game Tiles",_th.game);
            console.log("Current Game",_th.gameTiles);
            console.log("current Game tiles",_th.matchinTiles);
            _th.completionHandler(_th.game, _th.gameTiles, _th.matchinTiles);
        }
    }
    
}