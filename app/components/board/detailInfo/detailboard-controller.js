module.exports = function($scope, menuService, gameService, sharedService, tileService ,$compile, $element, $stateParams) {

    var gameId = $stateParams.boardId;
    var _th = this;

    this.players = sharedService.currentGame.players;
    this.playerMatchedTiles = [];
    this.currentGame = sharedService.currentGame;

    this.setMatchedPlayersTiles = function (player) {
        console.log(this.playerMatchedTiles);
        this.playerMatchedTiles = [];
        for(i = 0; i < sharedService.currentMatchingGameTiles.length; i++) {
            if(sharedService.currentMatchingGameTiles[i].match.foundBy == player._id) {
                this.playerMatchedTiles.push(sharedService.currentMatchingGameTiles[i]);
            }
        }
    }


}