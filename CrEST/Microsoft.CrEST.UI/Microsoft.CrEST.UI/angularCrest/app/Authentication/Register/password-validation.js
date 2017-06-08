var PasswordValidation = (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (confirmPassword != '') {
            if (password != confirmPassword) {
                console.log('false');
                AC.get('confirmPassword').setErrors({ MatchPassword: true });
            }
            else {
                console.log('true');
                return null;
            }
        }
    };
    return PasswordValidation;
}());
export { PasswordValidation };
//# sourceMappingURL=password-validation.js.map