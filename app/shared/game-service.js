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
        var game = response.data[i];
        game.createName = game.createdBy._id;

        sharedService.currentGames.push(game);

    }
    sharedService.loading = false;
       
    //localStorage.setItem("gameslist", JSON.stringify(sharedService.currentGames));

        console.log(authService.login.username)
        console.log(response.data);
   }
    
    this.getAllGames = function() {
        // var gamesInStorage = localStorage.getItem("gameslist");
        //
        // console.log(JSON.parse(gamesInStorage));
        
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