describe("test Controller", function() {

    var authService2;
    var scope;

    // // initialize the app
    console.log(angular)
    beforeEach(module('mahjong'));

    beforeEach(inject(function($rootScope, $injector){

        scope = $rootScope.$new();

        authService2 = $injector.get('authService');

        authService2.getLoginFromURL = sinon.stub();

        authService2.getLoginFromURL = function () {
            authService2.login.username = "U_S_E_R_N_A_M_E";
            authService2.login.token = "T_O_K_E_N"
        }

    }));

    it('test AuthService isLoggedInFunction', function(){
        // // Given
        //
        authService2.getLoginFromURL();
        var a = authService2.checkIfUserIsLogedIn();

        expect(authService2.checkIfUserIsLogedIn()).to.not.equal(false);
    });

});
