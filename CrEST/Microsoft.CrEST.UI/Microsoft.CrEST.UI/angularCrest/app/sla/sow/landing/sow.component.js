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
import { SowService } from "../../shared/services/sows.service";
var SowComponent = (function () {
    function SowComponent(sowService) {
        this.sowService = sowService;
        this.sows = [];
        this.colHeaders = [
            'Supplier',
            'Service Line',
            'Contract ID',
            'SOW Effective Date',
            'SOW Expiration Date',
            'MS Owner Alias',
            'Service Catalog Version',
            'PO# Yr 1',
            'SOW Amount Yr 1',
            'SOW Amount Yr 2',
            'SOW Amount Yr 3',
            'SOW Amount Yr 4',
            'IsCrest?',
            'Remarks'
        ];
        this.columns = [
            {
                data: 'supplier.name',
                source: 'supplier.options',
                optionField: 'name',
                type: 'autocomplete',
                strict: false,
                visibleRows: 4
            },
            {
                data: 'serviceLine.name',
                source: 'serviceLine.options',
                optionField: 'name',
                type: 'autocomplete',
                strict: false,
                visibleRows: 4
            },
            {
                data: 'contractID'
            },
            {
                data: 'effectiveDate'
            },
            {
                data: 'expirationDate',
            },
            {
                data: 'msOwnerAlias',
            },
            {
                data: 'serviceCatalogVersion',
            },
            {
                data: 'poYr1',
            },
            {
                data: 'amountYr1',
                type: 'numeric',
                format: '$ 0,0.00'
            },
            {
                data: 'amountYr2',
                type: 'numeric',
                format: '$ 0,0.00'
            },
            {
                data: 'amountYr3',
                type: 'numeric',
                format: '$ 0,0.00'
            },
            {
                data: 'amountYr4',
                type: 'numeric',
                format: '$ 0,0.00'
            },
            {
                data: 'isCrest',
                type: 'checkbox',
                checkedTemplate: 'Yes',
                uncheckedTemplate: 'No'
            },
            {
                data: 'remarks'
            }
        ];
        this.colWidths = [
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, 30
        ];
        this.options = {
            stretchH: 'all',
            columnSorting: true,
            contextMenu: [
                'row_above', 'row_below', 'remove_row'
            ]
        };
    }
    SowComponent.prototype.afterChange = function (e) {
        console.log(e);
    };
    SowComponent.prototype.afterOnCellMouseDown = function (e) {
        console.log(e);
    };
    SowComponent.prototype.ngOnInit = function () {
        //this.sowService.getSows()
        //    .subscribe(data => this.sows = data);
        var _this = this;
        this.sowService.getSows()
            .subscribe(function (data) { return _this.data = data; });
    };
    SowComponent.prototype.deleteSow = function (sow) {
        var _this = this;
        if (confirm("Are you sure you want to delete " + sow.name + "?")) {
            var index = this.sows.indexOf(sow);
            this.sows.splice(index, 1);
            this.sowService.deleteSow(sow.id)
                .subscribe(null, function (err) {
                alert("Could not delete sow.");
                // Revert the view back to its original state
                _this.sows.splice(index, 0, sow);
            });
        }
    };
    return SowComponent;
}());
SowComponent = __decorate([
    Component({
        selector: 'sow-grid',
        templateUrl: './sow.component.html',
    }),
    __metadata("design:paramtypes", [SowService])
], SowComponent);
export { SowComponent };
//# sourceMappingURL=sow.component.js.map