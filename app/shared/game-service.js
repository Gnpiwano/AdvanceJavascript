module.exports = function(dataService, sharedService, authService) {
    
    var _th = this;
    
    this.getGame = function(id, completionHandler ) {
        console.log("GetGame1");
        if( completionHandler != undefined) {           
            dataService.getData("/Games/"+id, completionHandler )
        } else {
            dataService.getData("/Games/"+id, function(response) {
                console.log("loggin game-service getGame() response.data:", response.data);
                sharedService.currentGame = response.data
            });
        }
    }
    
    this.createGame = function(game) {
        dataService.postData("/Games", game);
        //_th.getAllGames();
    }
    
    this.getTilesFromGame = function(id, completionHandler) {
        dataService.getData("/Games/"+id+"/Tiles", completionHandler)
    }
    
    this.joinGame = function(game) {
        var player = {
            "name" : authService.login.username
        }
        game.players.push(player);
        dataService.postData("/Games/" + game._id + "/Players");
    }
    
    this.startGame = function(gameId) {
        console.log("game-service startgame testing url:", "/Games/"+gameId+"/Start");
        dataService.postData("/Games/"+gameId+"/Start");
    }

   var setGames = function(response) {
    for(i = 0; i < response.data.length ; i++ ) {
        if(response.data[i].state != "closed") {
            sharedService.openGames.push(response.data[i]);
        } else {
            sharedService.closedGames.push(response.data[i]);
        }
    }
    sharedService.currentGames = sharedService.openGames;
    sharedService.loading = false;
       
    localStorage.setItem("openGameslist", JSON.stringify(sharedService.openGames));
    localStorage.setItem("closedGameslist",JSON.stringify(sharedService.closedGames));
       
    console.log(response.data);
   }
    
    this.getAllGames = function() {
        var opengames = localStorage.getItem("openGameslist");
        var closedgames = localStorage.getItem("closedGameslist");
        
        console.log(JSON.parse(opengames));
        console.log(JSON.parse(closedgames));
        
//        if(opengames != undefined) {
//            sharedService.openGames = JSON.parse(opengames);
//            sharedService.currentGames = sharedService.openGames;
//            sharedService.loading = false;
//        }
//        if(closedgames != undefined) {
//            sharedService.closedGames = JSON.parse(closedgames);
//        }
        
        dataService.getData("/Games", setGames );
    }
}