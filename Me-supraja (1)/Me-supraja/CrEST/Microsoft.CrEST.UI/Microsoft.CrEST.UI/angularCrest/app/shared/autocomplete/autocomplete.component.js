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
var VIAutoCompleteComponent = (function () {
    function VIAutoCompleteComponent() {
        this.notifyOnSelected = new EventEmitter();
        this.foucusedItem = 0;
        this.isFocusedOnItem = false;
        this.scrollIndex = 0;
        this.popupShow = false;
        this.scrollMax = 125;
    }
    VIAutoCompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.elementToBind.addEventListener("keydown", function (e) {
            if (e.keyCode == 38) {
                if (_this.foucusedItem > 1) {
                    _this.foucusedItem = _this.foucusedItem - 1;
                    _this.scrollIndex -= 25;
                    if (_this.scrollIndex == _this.scrollMax - 125) {
                        document.getElementById(_this.tagId).scrollTop = _this.scrollIndex - 100;
                        _this.scrollMax -= 100;
                    }
                }
            }
            else if (e.keyCode == 40) {
                if (_this.foucusedItem < _this.values.length) {
                    _this.foucusedItem = _this.foucusedItem + 1;
                    _this.scrollIndex += 25;
                    if (_this.scrollIndex == _this.scrollMax) {
                        document.getElementById(_this.tagId).scrollTop = _this.scrollIndex - 25;
                        _this.scrollMax += 100;
                    }
                }
            }
            else {
                if (e.keyCode == 13) {
                    _this.notifyOnSelected.emit(_this.values[_this.foucusedItem - 1]);
                    _this.resetPopupSettings(false);
                }
                else if (e.keyCode == 9) {
                    _this.resetPopupSettings(false);
                }
                else {
                    _this.resetPopupSettings(true);
                }
                document.getElementById(_this.tagId).scrollTop = 0;
            }
        });
        this.elementToBind.addEventListener("blur", function (e) {
            if (!_this.isFocusedOnItem) {
                var currentValue = this.value;
                if (currentValue != null && currentValue.trim() != "" && _this.values.indexOf(currentValue) == -1) {
                    currentValue = "";
                    alert("valid");
                }
                else if (currentValue == "" && _this.values.indexOf(currentValue) == -1) {
                    currentValue = "";
                }
                else if (currentValue.trim() == "") {
                    currentValue = "";
                    alert("invalid");
                }
                _this.resetPopupSettings(false);
            }
        });
        this.elementToBind.addEventListener("focus", function (e) {
            _this.isFocusedOnItem = false;
            _this.resetPopupSettings(true);
        });
    };
    VIAutoCompleteComponent.prototype.selectedItem = function (item) {
        this.notifyOnSelected.emit(item);
        this.resetPopupSettings(false);
    };
    VIAutoCompleteComponent.prototype.resetPopupSettings = function (showPopUp) {
        this.popupShow = showPopUp;
        this.foucusedItem = 0;
        this.scrollIndex = 0;
        this.scrollMax = 125;
    };
    return VIAutoCompleteComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", HTMLElement)
], VIAutoCompleteComponent.prototype, "elementToBind", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], VIAutoCompleteComponent.prototype, "values", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], VIAutoCompleteComponent.prototype, "tagId", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], VIAutoCompleteComponent.prototype, "notifyOnSelected", void 0);
VIAutoCompleteComponent = __decorate([
    Component({
        selector: 'auto-complete',
        templateUrl: './autocomplete.component.html',
        styleUrls: ['./autocomplete.component.css'],
    })
], VIAutoCompleteComponent);
export { VIAutoCompleteComponent };
//# sourceMappingURL=autocomplete.component.js.map