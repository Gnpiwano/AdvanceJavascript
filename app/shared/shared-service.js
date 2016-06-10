module.exports = function() {
    
    this.openGames = [];
    this.closedGames = [];

    this.currentGame = {};
    this.currentGametiles = [];
    this.currentMatchingGameTiles = [];

    this.loading = false;
    this.selectedTilesIds = [];
}