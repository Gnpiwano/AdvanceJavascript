module.exports = function($mdSidenav, $mdComponentRegistry, sharedService) {
    var ctrl = this;

    this.isOpen = function() { return false };
    $mdComponentRegistry
        .when("left")
        .then( function(sideNav){

            ctrl.isOpen = angular.bind( sideNav, sideNav.isOpen );
            ctrl.toggle = angular.bind( sideNav, sideNav.toggle );
        });

    this.toggleRight = function() {
        $mdSidenav("left").toggle()
            .then(function(){
            });
    };

    this.close = function() {
        $mdSidenav("right").close()
            .then(function(){
            });
    };

    this.openMenu = function() {
        $mdSidenav("left").toggle();
    }
    
    this.add = function() {
        console.log("TODO add toevoegen");
    }
}