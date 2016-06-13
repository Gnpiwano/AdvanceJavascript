module.exports = function($http, sharedService) {
    
    var baseUrl = "http://mahjongmayhem.herokuapp.com";
    var _th = this;
    
    this.getData = function( urlParameter, onSucces ) {
        $http.get(baseUrl + urlParameter , _th.config).then(onSucces, _th.logError);
    }
    
    this.postData = function(urlParameter, dataToSend, completionHandler) {
        console.log(_th.config);
        var req = {
            method: 'POST',
            url: baseUrl + urlParameter,
            headers: {
                'x-username': _th.getCookie("x-username"),
                "x-token": _th.getCookie("x-token")      
            },
            data: dataToSend
        }

        if( completionHandler != undefined) {
            $http(req).then( completionHandler, function(error) {
                console.warn(error)
            });
        } else {
            $http(req).then(function(result) {
                console.info(result)
            }, function(error) {
                console.warn(error)
            });
        }

    } 
    
    this.logError = function(error) {
        console.error("Error ->",error);
    }
    
    this.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    } 
    
    this.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }    
    
    this.config = {headers: {
            "x-username": _th.getCookie("x-username"),
            "x-token": _th.getCookie("x-token")
        }
    };
    
}