module.exports = function($scope, $location, menuService, authService, gameService, sharedService, $state) {
    
        $location.$$search = {};    
        $location.search('key', null)
        var _th = this;
        $scope.menu = menuService;
        this.shared = sharedService;
        $scope.listState = "playing"
        sharedService.loading = true;
    
        this.game = {};
    
        this.boardTypes = [
            {name : "Ox"},
            {name : "Ram"},
            {name : "Dragon"},
            {name : "Shanghai"}
        ];

        
        this.createNewGame = function(game) {
            console.log("CreateNewGame");
            gameService.createGame(game);
            _th.showNewGame = false;
            
        }
        
        this.joinGame = function(game) {
            console.log("JoinGame");
            gameService.joinGame(game);
        }
        
        this.startGame = function(game) {
            console.log("startGame");
            gameService.startGame(game._id);
        }
    
        if(authService.checkIfUserIsLogedIn()) {
            gameService.getAllGames();
        }
    
        this.add = function() {
            if(_th.showNewGame) {
                _th.showNewGame = false;
            } else {
                _th.showNewGame = true;
            }

        }
        
        this.goToListItem = function(game) {
            sharedService.currentGame = game;
            
            $state.go('board.playingBoard');
            //window.location.replace("#/board");
        }
        
        this.canStartGame = function(game) {
            if(game.createdBy._id == authService.login.username && game.state != "playing") {
                return true;
            }
            return false;
        }
        
        this.canJoinGame = function(game) {
            if( !_th.canStartGame(game) && game.state == "open") {
                return true;
            }
            return false;
        }
}