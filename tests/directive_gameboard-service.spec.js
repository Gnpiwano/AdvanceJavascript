describe("auth service", function() {


    var $scope;
    var $compile;
    var tile;

    // // initialize the app


    // initialize the app
    beforeEach(module('mahjong'));
    beforeEach(module('assets/html/gameboard.html'));



    beforeEach(inject(function( _gameboard_ , $rootScope, _$compile_){

        // tile = _tile_;
        // $scope = $rootScope.$new();
        // $compile = _$compile__;

        // authService2.login = sinon.stub();
        // authService2.login = "!";

    }));

    it('should mock the', function(){

        //var element = $compile('<tile></tile>')($scope);
        // $scope.$digest();
        //
        // // Vergelijk dit met JQuery, we kunnen zoeken in een element naar een <button>
        // // We voeren dan de methode 'click' uit.
        // element.find('button').triggerHandler('click');
        //
        // // We kunnen de html opvragen en vergelijken met wat we verwachten.
        // // In dit geval verwachten we dat de voor- en achternaam achter elkaar in een h3 staan.
        // expect(element.html()).to.have.string('<h3 class="ng-binding">Martijn Schuurmans</h3>');

    });

});
