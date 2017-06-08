var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { UserService } from "../_services/user.service";
var LoginComponent = (function () {
    function LoginComponent(route, router, userService, alertService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.userService.validateUser(this.model.username, this.model.password)
            .subscribe(function (data) {
            if (data == 1) {
                localStorage.setItem('currentUser', JSON.stringify(_this.model.username));
                _this.router.navigate(['/home']);
            }
            else if (data == 0) {
                _this.loading = false;
                _this.alertService.error('Invalid Username', false);
                _this.router.navigate(['/login']);
            }
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'login-page',
        templateUrl: './login.component.html',
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        UserService,
        AlertService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map