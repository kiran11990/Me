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
import { CrestHandsonComponent } from "./cresthandson.component";
var SlpComponent = (function () {
    function SlpComponent() {
        this.data = [{ "id": "1" }, { "id": "2" }, { "id": "3" }];
        this.colHeaders = ['id'];
        this.columns = [{
                data: 'id'
            }];
        this.colWidths = [null];
        //@ViewChild(CrestHandsonComponent)
        this._crestHandsonComponent = new CrestHandsonComponent();
        this._crestHandsonComponent.data = this.data;
        this._crestHandsonComponent.colHeaders = this.colHeaders;
        this._crestHandsonComponent.columns = this.columns;
        this._crestHandsonComponent.colWidths = this.colWidths;
    }
    return SlpComponent;
}());
SlpComponent = __decorate([
    Component({
        selector: 'sla-slp',
        templateUrl: './slp.component.html',
    }),
    __metadata("design:paramtypes", [])
], SlpComponent);
export { SlpComponent };
//# sourceMappingURL=slp.component.js.map