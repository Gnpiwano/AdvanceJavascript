module.exports = function($scope, $timeout , gameboardService, sharedService, tileService ,$compile, $element, $stateParams, socketService) {


    var gameId = $stateParams.boardId;
    var _th = this;

    this.init = function () {
        setupBoard();
        initSocket();
    }

    var initSocket = function () {
        // init socket
        var gameSocket = socketService.createConnection(gameId);
        // end socket

        gameSocket.on('match', function(tiles) {
            //add Matchine tiles en bouw game opnieuw op.

            tiles.forEach(function (tile) {
                // remove tile from field.
                var documentTile = document.getElementById(tile._id);
                if(documentTile != null) {
                    tile.parentElement.removeChild(tile);
                }

                sharedService.currentGametiles.forEach(function (gameboardTile) {
                   if(tile._id == gameboardTile._id) {
                       gameboardTile.matched = true;
                        console.log("TICK TACK TO");
                       sharedService.currentMatchingGameTiles.push(tile);
                   }
                });
                console.log("new Current Matching gameTiles = ", sharedService.currentMatchingGameTiles);
                // add tile to detail view

            })
            console.log("match tiles gameSocet response", tiles);
        });

        gameSocket.on('end', function() {
            //alert game is ended en ga terug naar menu.
            
        });

    }

    var setupBoard = function () {
        if(tileService.checkIfMatchingIsPossible()) {
            alert("there are no matches anymore!");
        }

        if(gameId != sharedService.currentGame._id) {
            gameboardService.getGameBoard(gameId, function (game, gameTiles, matchedTiles) {
                sharedService.currentGame = game;
                sharedService.currentGametiles = gameTiles;
                sharedService.currentMatchingGameTiles = matchedTiles;
                setTiles(gameTiles, matchedTiles);
            });
        } else {

            setTiles(sharedService.currentGametiles, sharedService.currentMatchingGameTiles);

        }
    }

    var setTiles = function(tiles, matchedTiles) {
        setTimeout(function () {
            console.log("matchedTiles",matchedTiles);
            tiles.forEach(function(tile) {
                var addTile = true;
                matchedTiles.forEach(function (matchedTile) {
                    if(tile._id == matchedTile._id) {
                        tile.matched = true;
                        addTile = false;
                    }
                })

                if(addTile) {
                    var marginLeft = tile.xPos * 28;
                    var marginTop = tile.yPos * 40;
                    var z_index = ((tile.zPos * 100) - tile.xPos + tile.yPos);
                    var id = tile._id;

                    $timeout(function() {
                        $scope.$apply(function () {
                            $element.find('gameboard').append($compile('<tile matchesWholeSuit="'+tile.tile.matchesWholeSuit+'" name="'+tile.tile.name +'" suit="'+tile.tile.suit+'" xas="'+tile.xPos+'" yas="'+tile.yPos+'" zas="'+tile.zPos+'" id="' + id +'" class="'+tile.tile.suit + tile.tile.name+'" style="z-index:'+z_index+'; margin-left:'+marginLeft+'px; margin-top:'+marginTop+'px;"></tile>')($scope));
                        });
                    })

                }
            });
        }, 500);



    }
}