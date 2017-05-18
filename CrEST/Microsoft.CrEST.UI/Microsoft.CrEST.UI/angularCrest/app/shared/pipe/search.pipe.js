var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../sla/shared/models/application.ts" />
import { Pipe } from '@angular/core';
var SearchPipe = (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (value, q) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(function (item) { return -1 < item.serviceLine.toLowerCase().indexOf(q.toLowerCase()); });
    };
    return SearchPipe;
}());
SearchPipe = __decorate([
    Pipe({ name: 'search' })
], SearchPipe);
export { SearchPipe };
//# sourceMappingURL=search.pipe.js.map