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
        console.log("Testing tiles", tiles);
        tiles.forEach(function(tile) {
            console.log("testing");
            var marginLeft = tile.xPos * 28;
            var marginTop = tile.yPos * 40;
            var z_index = ((tile.zPos * 100) - tile.xPos + tile.yPos);

            $element.find('gameboard').append($compile('<tile class="'+tile.tile.suit + tile.tile.name+'" style="z-index:'+z_index+'; margin-left:'+marginLeft+'px; margin-top:'+marginTop+'px;"></tile>')($scope));
            //var newElement2 = $compile('<tile class="Bamboo1"> </tile>')($scope);
            //var newElement3 = $compile('<div>testing</div>')($scope);
            // var newElement = $compile('<tile class="'+tile.tile.suit + tile.tile.name+'" style="margin-left:'+ marginLeft +'; margin-top:'+ marginTop +';"></tile>')($scope);
            //
            // $element.find('gameboard').append(newElement)
        })
    }
    
    getData();
}