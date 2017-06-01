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
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';
var RegisterComponent = (function () {
    function RegisterComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    RegisterComponent.prototype.register = function () {
        this.loading = true;
        //this.userService.create(this.model)
        //    .subscribe(
        //        data => {
        //            this.alertService.success('Registration successful', true);
        //            this.router.navigate(['/login']);
        //        },
        //        error => {
        //            this.alertService.error(error);
        //            this.loading = false;
        //        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Component({
        // moduleId: module.id,
        templateUrl: 'register.component.html',
        providers: [UserService, AlertService]
    }),
    __metadata("design:paramtypes", [Router,
        UserService,
        AlertService])
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map