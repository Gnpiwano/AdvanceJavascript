/**
 * Created by Gebruiker on 10-6-2016.
 */
module.exports = function(dataService,sharedService) {

    this.selectedTilesIds = [];
    var _th = this;

    this.matchTiles = function(gameid, id_tile1, id_tile_2) {
        console.log("url: "+"/Games/"+gameid+"/Tiles/matches"+ "tile1Id:" + id_tile1 + " - tile2Id" +id_tile_2);
        dataService.postData("/Games/"+gameid+"/Tiles/matches", {tile1Id: id_tile1, tile2Id: id_tile_2});
        //dataService.getData("/Games/"+id+"/Tiles", completionHandler)
    }

    this.getMatchedTilesFromGame = function (id, completionHandler) {
        dataService.getData("/Games/"+id+"/Tiles/matches", completionHandler);
    }

    this.checkTile = function (x, y, z, id) {
        if(checkIfTileIsAlreadySelected(id)) {
            return false;
        }

    }

    this.checkIfTileCanBeSelectedMajongRules = function (x, y, z, id) {
        //check if tile geselecteerd kan worden // if z > niks is.    if x - 1 == niks || x + 1 == niks

        var canSelected = true;
        var leftNeighbour = false;
        var rightNeigbour = false;

        for(i = 0; i < sharedService.currentGametiles.length; i++) {
            var tile = sharedService.currentGametiles[i];
            if(tile.matched != true) {
                // er ligt een tegel bovenop de gene die je wil selecteren.
                if(x == tile.xPos || x == (tile.xPos -1) || x == (tile.xPos +1) ) {
                    if(y == tile.yPos || y == (tile.yPos -1) || y == (tile.yPos +1) ) {
                        if(tile.zPos > z) {
                            canSelected = false;
                            break;
                        }
                    }
                }
                // elementx - 1 exist || elementx + 1 exist

                if(z == tile.zPos) {
                    if(y == tile.yPos || y == (tile.yPos -1) || y == (tile.yPos +1)) {
                        if((tile.xPos - 2) == x) {
                            leftNeighbour = true;
                        }
                        if((tile.xPos - 1) == x) {
                            leftNeighbour = true;
                        }

                        if((tile.xPos + 2) == x) {
                            rightNeigbour = true;
                        }
                        if((tile.xPos + 1) == x) {
                            rightNeigbour = true;
                        }
                    }
                }
            }
        }

        if(leftNeighbour == true && rightNeigbour == true) {
            canSelected = false;
        }
        return canSelected;
    }

    this.checkIfTileIsAlreadySelected = function (id) {
        for(i = 0; i < _th.selectedTilesIds.length; i++) {
            if(_th.selectedTilesIds[i].id == id) {
                return true;
            }
        }
        return false;
    }

    this.checkIfMatchingIsPossible = function () {
        if(sharedService.currentGametiles !== undefined && sharedService.currentMatchingGameTiles !== undefined) {

            var tilesThatCanBeSelected = [];
            for(i = 0; i < sharedService.currentGametiles.length; i++) {
                var tile = sharedService.currentGametiles[i];
                if(_th.checkIfTileCanBeSelectedMajongRules(tile.xPos, tile.yPos, tile.zPos, tile._id)) {
                    tilesThatCanBeSelected.push(tile);
                }
            }

            for(i = 0; i < tilesThatCanBeSelected.length; i++) {

                for(b = 0;  b < tilesThatCanBeSelected.length; b++) {
                    if(tilesThatCanBeSelected[i]._id != tilesThatCanBeSelected[b]._id && tilesThatCanBeSelected[i].tile.suit == tilesThatCanBeSelected[b].tile.suit) {

                        if(tilesThatCanBeSelected[i].tile.matchesWholeSuit == true) {
                            return true;
                        } else {
                            if(tilesThatCanBeSelected[i].tile.name == tilesThatCanBeSelected[b].tile.name) {
                                return true;
                            }
                        }
                    }
                }
            }

        }
        return false;
    }
}