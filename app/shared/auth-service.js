module.exports = function(dataService) {
    
    var _th = this;
    
    this.login = {
        username: "",
        token: ""
    }
    
    this.checkIfUserIsLogedIn = function() {
        _th.getLoginFromCookie();
        _th.getLoginFromURL();
        if(_th.login.username == "") {
            return false;    
        } else {
            return true;
        }
    }
    
    this.getLoginFromURL = function() {
        console.log("GetLoginFrom uRL");
        
        if(_th.getUrlParams("username", window.location.href) != null && _th.getUrlParams("token", window.location.href) != null) {
            console.log("GetLoginFrom URL in IF");
            
            _th.login.username = _th.getUrlParams("username", window.location.href);
            _th.login.token = _th.getUrlParams("token", window.location.href);
             console.log("GetLoginFromURL Login credentials: ", _th.login );

            dataService.setCookie("x-username", _th.login.username, 5);
            dataService.setCookie("x-token", _th.login.token, 5);
            
            //document.cookie = "x-username=" + _th.login.username +";" + "x-token=" +_th.login.token+";";
            console.log("GetLoginFromURL in cookie", document.cookie);
        }
    }
    
    this.getLoginFromCookie = function() {
        console.log("GetLoginFrom Cookie");
        
        if(dataService.getCookie("x-token") != "" && dataService.getCookie("x-username") != "") {
        console.log("getLoginFromCookie whitin if");
            
            _th.login.username = dataService.getCookie("x-username");
            _th.login.token = dataService.getCookie("x-token");
            
        console.log("Getloginformcookie", document.cookie);
        }
    }
    this.getUrlParams = function(name, url) {
          if (!url) url = location.href;
          name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
          var regexS = "[\\?&]"+name+"=([^&#]*)";
          var regex = new RegExp( regexS );
          var results = regex.exec( url );
          return results == null ? null : results[1];
    }
}