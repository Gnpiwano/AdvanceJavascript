module.exports = function($scope, menuService, gameService, sharedService, $compile, $element, $stateParams) {
    
    $scope.menu = menuService;
    
    var gameId = $stateParams.boardId;
    var _th = this;
    
    var getData = function() {
        console.log("Ja data wordt geladen. ");
        console.log(sharedService.currentGame);

        if(gameId === undefined) {
            console.log("WTFFFF")
        }
        console.log("gameId:",gameId);
        if(gameId !== undefined) {
            console.log("testing");
            gameService.getGame(gameId);
            gameService.getTilesFromGame(gameId, getTilesCompletionHandler);
        }
    }

    var getTilesCompletionHandler = function(response) {
        console.log("Response Data: ", response);
        setTiles(response.data);
    }

    var setTiles = function(tiles) {
        sharedService.currentGametiles = tiles;
        tiles.forEach(function(tile) {
            var marginLeft = tile.xPos * 28;
            var marginTop = tile.yPos * 40;
            var z_index = ((tile.zPos * 100) - tile.xPos + tile.yPos);
            var id = tile._id;

            $element.find('gameboard').append($compile('<tile xas="'+tile.xPos+'" yas="'+tile.yPos+'" zas="'+tile.zPos+'" id="' + id +'" class="'+tile.tile.suit + tile.tile.name+'" style="z-index:'+z_index+'; margin-left:'+marginLeft+'px; margin-top:'+marginTop+'px;"></tile>')($scope));
        })
    }

    getData();
}