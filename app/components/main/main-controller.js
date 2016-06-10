module.exports = function($scope, $location, menuService, authService, gameService, sharedService, $state) {

        var _th = this;

        $scope.menu = menuService;
        sharedService.loading = true;
        this.shared = sharedService;
        this.listState = "playing";
        this.gameOwner = '';

        $scope.init = function () {
            $location.$$search = {};
            $location.search('key', null)

            if(authService.checkIfUserIsLogedIn()) {
                gameService.getAllGames();
            }
        };


    
        this.game = {};
    
        this.boardTypes = [
            {name : "Ox"},
            {name : "Ram"},
            {name : "Dragon"},
            {name : "Shanghai"}
        ];

        this.changePlayingState = function (state) {
            this.listState = state;
        }

        this.changePlayerGames = function (playerId) {
            if (playerId == 'me') {
                this.gameOwner = authService.login.username;
            } else {
                this.gameOwner = playerId;
            }
        }
        
        this.createNewGame = function(game) {
            console.log("CreateNewGame");
            gameService.createGame(game);
            _th.showNewGame = false;
            gameService.getAllGames();
        }
    
        this.add = function() {
            if(_th.showNewGame) {
                _th.showNewGame = false;
            } else {
                _th.showNewGame = true;
            }

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

        this.joinGame = function(game) {
            console.log("JoinGame");
            gameService.joinGame(game);
        }

        this.startGame = function(game) {
            console.log("startGame");
            gameService.startGame(game._id);
        }
}