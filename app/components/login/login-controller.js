module.exports = function($scope,$location, authService, dataService) {

    var _th = this;
    this.accountName = "";
    this.accountVisible = false;
    
    
    this.setAccountName = function() {
        if(authService.checkIfUserIsLogedIn()) {
            _th.accountName = dataService.getCookie("x-username");
            _th.accountVisible = true;
        }
    };

    this.login = function() {
        if(_th.accountVisible) {
            window.location.href = "http://localhost:3000/#/main";
        } else {
            window.location.href = "http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:3000";
        }
        
        
    }
    
    this.init = function() {
        _th.setAccountName();
    }

}