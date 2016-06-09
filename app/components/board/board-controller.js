module.exports = function($scope, menuService, gameService, sharedService, $compile, $element, $stateParams) {
    
    $scope.menu = menuService;
    
    var gameId = $stateParams.boardId        
    var _th = this;
    
    var getData = function() {
        console.log("Ja data wordt geladen. ");
        console.log(sharedService.currentGame);
        
        
        console.log("gameId:",gameId);
        if(gameId != undefined) {
            console.log("testing");
            gameService.getGame(gameId);
            gameService.getTilesFromGame(gameId, getTilesCompletionHandler);
        }
    }
    
    var getTilesCompletionHandler = function(response) {
        console.log("Response Data: ", response);
        setTiles(response.data);
    }
    
    var counter = 0;
    var setTiles = function(tiles) {
        
//        tiles.forEach(function(tile) {
//                var marginLeft = tile.xPos * 32;
//                var marginTop = tile.yPos * 50;
//            
//                var newElement = $compile('<tile class="'+tile.tile.suit + tile.tile.name+'" style="margin-left:'+ marginLeft +'; margin-top:'+ marginTop +';"></tile>')($scope)
//                $element.find('gameboard').append(newElement)
//            counter++;
//            console.log(tile)
//        })
//        console.log("aantal tiles: " + counter);
    }
    
    $scope.tiles = "WEETETETETEETETET";
    
    getData();
}