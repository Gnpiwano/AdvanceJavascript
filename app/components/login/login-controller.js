module.exports = function($scope,$location, authService, dataService, $state) {

    var _th = this;
    this.accountName = "";
    this.accountVisible = false;
    
    
    var setAccountName = function() {
        if(authService.checkIfUserIsLogedIn()) {
            _th.accountName = dataService.getCookie("x-username");
            _th.accountVisible = true;
        }
    };

    this.login = function() {
        if(_th.accountVisible) {
            //$state.go('main');
            window.location.href = "http://localhost:3000/#/main";
        } else {
            window.location.href = "http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:3000";
        }
        
        
    }
    
    this.logout = function() {
        console.log("username", dataService.getCookie("x-username"));
        console.log("token",dataService.getCookie("x-token"));
        console.log(document.cookie);
        // remove cookie
    }
    
    setAccountName();
}