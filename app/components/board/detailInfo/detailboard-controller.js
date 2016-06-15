module.exports = function($scope, menuService, gameService, sharedService, tileService ,$compile, $element, $stateParams) {

    var gameId = $stateParams.boardId;
    var _th = this;

    this.players = sharedService.currentGame.players;
    this.playerMatchedTiles = [];
    this.currentGame = sharedService.currentGame;

    this.setMatchedPlayersTiles = function (player) {
         _th.playerMatchedTiles = [];

        _th.playerMatchedTiles = sharedService.currentMatchingGameTiles;

        // console.log("ActionFor CurrentMatching Game Tiles", sharedService.currentMatchingGameTiles);
        //
        // sharedService.currentMatchingGameTiles.forEach(function (tile) {
        //         console.log("Before Things Focked up:", tile._id +" - player Id:"+player._id);
        //         if(tile.match.foundBy == player._id) {
        //             _th.playerMatchedTiles.push(tile);
        //         }
        // });

        // for(i = 0; i < sharedService.currentMatchingGameTiles.length; i++) {

        // }
    }
}