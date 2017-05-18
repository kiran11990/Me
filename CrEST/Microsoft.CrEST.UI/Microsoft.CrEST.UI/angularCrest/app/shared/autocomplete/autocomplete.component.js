var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var AutoCompleteComponent = (function () {
    function AutoCompleteComponent() {
        this.notifyOnSelected = new EventEmitter();
        this.foucusedItem = 0;
        this.isFocusedOnItem = false;
        this.scrollIndex = 0;
        this.popupShow = false;
        this.scrollMax = 125;
    }
    AutoCompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.elementToBind.addEventListener("blur", function (e) {
            if (!_this.isFocusedOnItem) {
                var currentValue = this.value;
                if (currentValue != null && currentValue.trim() != "" && _this.values.indexOf(currentValue) == -1) {
                    currentValue = "";
                }
                else if (currentValue.trim() == "" && currentValue == undefined && _this.values.indexOf(currentValue) == -1) {
                    currentValue = "";
                    _this.resetPopupSettings(false);
                }
                else if (currentValue.trim() == "" || currentValue == undefined) {
                    currentValue = "";
                    _this.resetPopupSettings(false);
                }
                _this.resetPopupSettings(false);
            }
        });
        this.elementToBind.addEventListener("focus", function (e) {
            var currentValue = this.value;
            _this.isFocusedOnItem = false;
            _this.resetPopupSettings(true);
        });
    };
    AutoCompleteComponent.prototype.selectedItem = function (item) {
        this.notifyOnSelected.emit(item);
        this.resetPopupSettings(false);
    };
    AutoCompleteComponent.prototype.resetPopupSettings = function (showPopUp) {
        this.popupShow = showPopUp;
        this.foucusedItem = 0;
        this.scrollIndex = 0;
        this.scrollMax = 125;
    };
    return AutoCompleteComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", HTMLElement)
], AutoCompleteComponent.prototype, "elementToBind", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AutoCompleteComponent.prototype, "values", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AutoCompleteComponent.prototype, "tagId", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AutoCompleteComponent.prototype, "notifyOnSelected", void 0);
AutoCompleteComponent = __decorate([
    Component({
        selector: 'auto-complete',
        templateUrl: './autocomplete.component.html',
        styles: [String(require('./autocomplete.component.css'))],
    })
], AutoCompleteComponent);
export { AutoCompleteComponent };
//# sourceMappingURL=autocomplete.component.js.map