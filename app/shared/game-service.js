module.exports = function(dataService, sharedService, authService) {
    
    var _th = this;
    
    this.getGame = function(id, completionHandler ) {
        if( completionHandler != undefined) {           
            dataService.getData("/Games/"+id, completionHandler )
        } else {
            dataService.getData("/Games/"+id, function(response) {
                console.log("loggin game-service getGame() response.data:", response.data);
                sharedService.currentGame = response.data
            });
        }
    }
    
    this.createGame = function(game, completionHandler) {
        dataService.postData("/Games", game, completionHandler);
    }
    
    this.getTilesFromGame = function(id, completionHandler) {
        dataService.getData("/Games/"+id+"/Tiles", completionHandler)
    }
    
    this.joinGame = function(game, completionHandler) {
        var player = {
            "name" : authService.login.username
        }
        game.players.push(player);
        dataService.postData("/Games/" + game._id + "/Players", completionHandler);
    }
    
    this.startGame = function(gameId, completionHandler) {
        console.log("game-service startgame testing url:", "/Games/"+gameId+"/Start");
        dataService.postData("/Games/"+gameId+"/Start", completionHandler);
    }

   var setGames = function(response) {
       sharedService.currentGames = [];
       console.log("Games:",response.data)
    for(i = 0; i < response.data.length ; i++ ) {
        var game = response.data[i];
        game.createName = game.createdBy._id;

        sharedService.currentGames.push(game);
    }
    sharedService.loading = false;
   }
    
    this.getAllGames = function() {
        dataService.getData("/Games", setGames );
    }
}