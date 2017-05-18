var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../sla/shared/models/service.ts" />
import { Pipe } from '@angular/core';
var SearchPipe = (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (value, args, arg2) {
        var contactId = args;
        // var serviceLine = arg1
        var application = arg2;
        if ((contactId.trim() !== '' || null || undefined) && (application.trim() !== '' || null || undefined)) {
            return value.filter(function (value) {
                return (value.contractid == contactId) && (value.ApplicationGroup.toLowerCase().indexOf(application.toLowerCase()) !== -1);
            });
        }
        else if ((contactId.trim() != "" || null || undefined) && (application.trim() == '' || null || undefined)) {
            return value.filter(function (value) {
                return (value.contractid == contactId);
            });
        }
        else if ((contactId.trim() != "" || null || undefined) && (application.trim() != "" || null || undefined)) {
            return value.filter(function (value) {
                return (value.contractid == contactId) && (value.ApplicationGroup.toLowerCase().indexOf(application.toLowerCase()) !== -1);
            });
        }
        else if ((contactId.trim() == "" || null || undefined) && (application.trim() != '' || null || undefined)) {
            return value.filter(function (value) {
                return (value.ApplicationGroup.toLowerCase().indexOf(application.toLowerCase()) !== -1);
            });
        }
        else if (contactId.trim() != "" || null || undefined) {
            return value.filter(function (value) {
                return (value.contractid == contactId);
            });
        }
        else if (application.trim() != "" || null || undefined) {
            return value.filter(function (value) {
                return (value.ApplicationGroup.toLowerCase().indexOf(application.toLowerCase()) !== -1);
            });
        }
        return value;
    };
    return SearchPipe;
}());
SearchPipe = __decorate([
    Pipe({ name: 'search' })
], SearchPipe);
export { SearchPipe };
//# sourceMappingURL=searchservice.pipe.js.map