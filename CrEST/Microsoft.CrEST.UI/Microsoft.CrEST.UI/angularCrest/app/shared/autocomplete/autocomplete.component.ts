import { ElementRef, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'auto-complete',
    templateUrl: './autocomplete.component.html',
    styles: [String(require('./autocomplete.component.css'))],
})
export class AutoCompleteComponent implements OnInit {
    @Input() elementToBind: HTMLElement;
    @Input() values: string[];
    @Input() tagId: string;
    @Output() notifyOnSelected: EventEmitter<string> = new EventEmitter<string>();
    foucusedItem: number = 0;
    isFocusedOnItem: boolean = false;
    scrollIndex: number = 0;
    popupShow: boolean = false;
    scrollMax: number = 125;
    

    ngOnInit() {

        var _this = this;
        this.elementToBind.addEventListener("blur", function (e) {
            if (!_this.isFocusedOnItem) {
                var currentValue = (<HTMLInputElement>this).value;
                
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
                    //alert("invalid");
                }

                _this.resetPopupSettings(false);

            }
        });
        this.elementToBind.addEventListener("focus", function (e) {
            var currentValue = (<HTMLInputElement>this).value;
            _this.isFocusedOnItem = false;
            _this.resetPopupSettings(true);
        });

    }


    selectedItem(item: string) {

        this.notifyOnSelected.emit(item);
        this.resetPopupSettings(false);
    }

    resetPopupSettings(showPopUp: boolean) {
        this.popupShow = showPopUp;
        this.foucusedItem = 0;
        this.scrollIndex = 0;
        this.scrollMax = 125;
    }


}



