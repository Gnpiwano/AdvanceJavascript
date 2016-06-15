describe("loginController tests", function() {

    var loginController;
    var scope;
    var location;
    var authService;
    var dataService;

    // initialize the app

    beforeEach(angular.mock.module('mahjong'));

    beforeEach(inject(function($rootScope, $controller, $location, $injector){
        scope = $rootScope.$new();

        authService = $injector.get('authService');
        dataService = $injector.get('dataService');

        location = $location;

        // Stubbing with sinon
        dataService.getCookie = sinon.stub();
        dataService.getCookie.withArgs('x-username').returns('TESTING');
        dataService.getCookie.returns('Hi from stub');

        authService.checkIfUserIsLogedIn = sinon.stub();
        authService.checkIfUserIsLogedIn.returns(true);


        loginController = $controller('loginController', { $scope: scope });

    }));


    it('test if accountVisible is true after user is set.', function(){
        loginController.setAccountName();
        expect(loginController.accountVisible).to.have.valueOf(true);
    });
});
