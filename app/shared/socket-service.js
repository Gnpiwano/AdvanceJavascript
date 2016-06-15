module.exports = function() {

    var socketConnection = null;
    var currentGameId = null;

    this.createConnection = function (gameId) {

        if(currentGameId == gameId) {
            return socketConnection;

        } else {
            currentGameId = gameId;
            socketConnection = io.connect('http://mahjongmayhem.herokuapp.com?gameId='+gameId);
            return socketConnection;
        }
    }
}