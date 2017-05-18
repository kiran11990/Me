import { ElementRef, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'auto-complete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css'],
})
export class VIAutoCompleteComponent implements OnInit {
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
                var currentValue = (<HTMLInputElement>this).value;
                
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



