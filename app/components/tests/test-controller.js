module.exports = function($scope, authService) {

    this.calculateNumbers = function (number) {
        return (number * 2);
    }

    this.returnLogin = function () {
        return authService.login;
    }

}