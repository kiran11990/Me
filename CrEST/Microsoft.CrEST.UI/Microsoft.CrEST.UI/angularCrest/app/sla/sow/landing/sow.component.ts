import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SowService } from "../../shared/services/sows.service";
import { Sow } from "../../shared/models/sow";
import { PaginationInstance } from 'ngx-pagination';

@Component({
    selector: 'sow-grid',
    templateUrl: './sow.component.html',
})

export class SowComponent {
    private sows: Sow[] = [];

    constructor(private sowService: SowService) { }

    public contractid = '';
    public serviceLine = '';
    public msOwnerAlias = '';

    public contractIDList: string[] = [];
    public servicelineList: string[] = [];
    public msOwnerAliasList: string[] = [];

    ngOnInit() {
        this.sowService.getSows()
            .subscribe(data => {
                this.sows = data
                if (this.sows) {
                    this.autoComplete();
                }
            });
    }

    public searchContractId = '';
    public searchServiceLine = '';
    public searchMsowner = '';
    find() {
        this.sowService.(this.contactId, this.serviceLine, this.application)
            .subscribe(data => {
                this.applicationList = data
            })

    }


    deleteSow(sow: any) {
        if (confirm("Are you sure you want to delete " + sow.name + "?")) {
            var index = this.sows.indexOf(sow);
            this.sows.splice(index, 1);

            this.sowService.deleteSow(sow.id)
                .subscribe(null,
                err => {
                    alert("Could not delete sow.");
                    // Revert the view back to its original state
                    this.sows.splice(index, 0, sow);
                });
        }
    }

    notifyContractId(contractID: string) {
        if (event) {
            this.contractid = contractID;
        }
    }

    notifyServiceLine(serviceLine: string) {
        if (event) {
            this.serviceLine = serviceLine;
        }
    }

    notifymsOwnerAlias(msOwnerAlias: string) {
        if (event) {
            this.msOwnerAlias = msOwnerAlias;
        }
    }

    autoComplete() {
        for (var i = 0; i < this.sows.length; i++) {
            this.contractIDList.push(this.sows[i].contractId.toString());
            //this.servicelineList.push(this.sows[i].);
            this.msOwnerAliasList.push(this.sows[i].msowner);
        }
    }

    public filter: string = '';
    public maxSize: number = 7;
    public directionLinks: boolean = true;
    public autoHide: boolean = false;
    public config: PaginationInstance = {
        id: 'advanced',
        itemsPerPage: 10,
        currentPage: 1
    };
    public labels: any = {
        previousLabel: 'Previous',
        nextLabel: 'Next',
        screenReaderPaginationLabel: 'Pagination',
        screenReaderPageLabel: 'page',
        screenReaderCurrentLabel: `You're on page`
    };

    private popped: any[] = [];

    onPageChange(number: number) {
        console.log('change to page', number);
        this.config.currentPage = number;
    }

    pushItem() {
        let item = this.popped.pop() || 'A newly-created meal!';
        this.sows.push(item);
    }

    popItem() {
        this.popped.push(this.sows.pop());
    }
}