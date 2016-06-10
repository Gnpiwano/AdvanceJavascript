module.exports = function($scope, menuService, gameService, sharedService, tileService ,$compile, $element, $stateParams) {


    var gameId = $stateParams.boardId;
    var _th = this;

    var getData = function() {

        if(gameId !== undefined) {
            gameService.getGame(gameId, getGameCompletionHandler);
            gameService.getTilesFromGame(gameId, getTilesCompletionHandler);
            tileService.getMatchedTilesFromGame(gameId, getMatchingTilesCompletionHandler);
        }

    }

    var getTilesCompletionHandler = function(response) {
        sharedService.currentGametiles = response.data;
        setupboard();
    }
    
    var getGameCompletionHandler = function(response) {
        sharedService.currentGame = response.data;
        setupboard();
    }
    
    var getMatchingTilesCompletionHandler = function(response) {
        sharedService.currentMatchingGameTiles = response.data;
        console.log("data die je terug krijgt:" ,response);
        setupboard();
    }
    
    var setupboard = function() {
        if(sharedService.currentMatchingGameTiles != null && sharedService.currentGame != null && sharedService.currentGametiles != null) {
            console.log("Matching Game Tiles",sharedService.currentMatchingGameTiles);
            console.log("Current Game",sharedService.currentGame);
            console.log("current Game tiles",sharedService.currentGametiles);
            setTiles(sharedService.currentGametiles, sharedService.currentMatchingGameTiles);
        }
    }

    var setTiles = function(tiles, matchedTiles) {
        // console.log("matches tiles: ", sharedService.currentMatchingGameTiles );
        // console.log("all tiles: ", sharedService.currentGametiles );
        tiles.forEach(function(tile) {
            var addTile = true;
            matchedTiles.forEach(function (matchedTile) {
                if(tile._id == matchedTile._id) {
                    addTile = false;
                }
            })
            if(addTile) {
                var marginLeft = tile.xPos * 28;
                var marginTop = tile.yPos * 40;
                var z_index = ((tile.zPos * 100) - tile.xPos + tile.yPos);
                var id = tile._id;

                if(tile.tile.matchesWholeSuit) {
                }

                $element.find('gameboard').append($compile('<tile xas="'+tile.xPos+'" yas="'+tile.yPos+'" zas="'+tile.zPos+'" id="' + id +'" class="'+tile.tile.suit + tile.tile.name+'" style="z-index:'+z_index+'; margin-left:'+marginLeft+'px; margin-top:'+marginTop+'px;"></tile>')($scope));
            }
        })
    }



    if(sharedService.currentGame._id == gameId) {
        sharedService.currentGame = null;
        sharedService.currentMatchingGameTiles = null;
        sharedService.currentGametiles = null;
        getData();
    }else {
        alert(sharedService.currentGame._id +" - "+ gameId);
        setTimeout(function () {
            setupboard();
        }, 500);
    }



}