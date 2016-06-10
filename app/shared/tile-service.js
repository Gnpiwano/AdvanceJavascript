/**
 * Created by Gebruiker on 10-6-2016.
 */
module.exports = function(dataService,sharedService, authService) {

    this.matchTiles = function(gameid, id_tile1, id_tile_2) {
        console.log("matchTiles");
        dataService.postData("/Games/"+gameid+"/Tiles/matches", {tile1Id: id_tile1, tile2Id: id_tile_2});
        //dataService.getData("/Games/"+id+"/Tiles", completionHandler)
    }

    this.getMatchedTilesFromGame = function (id, completionHandler) {
        dataService.getData("/Games/"+id+"/Tiles/matches", completionHandler);
    }
}