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

        this.goToListItem = function(game) {
            if(game.state != 'open') {
                $state.go('board', {boardId: game._id });
            }
        }

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
            sharedService.currentGames = [];
            sharedService.loading = true;
             gameService.createGame(game, _th.reloadDataCompletionHandler );
             _th.showNewGame = false;
        }

        this.reloadDataCompletionHandler = function (result) {
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
            if(game.createdBy._id == authService.login.username && game.state != "playing" && game.minPlayers <= game.players.length) {
                return true;
            }
            return false;
        }
        
        this.canJoinGame = function(game) {
            var go = true;
            game.players.forEach(function (player) {
               if(player._id == authService.login.username) {
                   go = false;
               }
            });

            if( !_th.canStartGame(game) && game.state == "open" && game.maxPlayers > game.players.length && go) {
                return true;
            }
            return false;
        }

        this.joinGame = function(game) {
            console.log("JoinGame");
            sharedService.loading = true;
            gameService.joinGame(game, _th.reloadDataCompletionHandler);
        }

        this.startGame = function(game) {
            game.state = "playing";
            sharedService.loading = true;
            gameService.startGame(game._id, _th.reloadDataCompletionHandler);
        }
}