import {Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { PaginationInstance } from 'ngx-pagination';
import { Sservice } from "../shared/services/service.service";
import { Service } from "../shared/models/service";




@Component({
    selector: 'sla-service',
    templateUrl:'./serviceline.component.html'
})


export class SlaServiceComponent {
    public sample: string = "";
    serviceline: string = "Sla Service";

    public contactId = '';
    public contractId = '';
    public serviceLine = '';
    public applicationgroup = '';
    public id: string;
    public states: any = [];
    public supplier = '';

    public contactdetails: string[] = [];
    public contactIdList: string[] = [];
    public servicelineList: string[] = [];
    public ApplicationLists: string[] = [];
    public SupplierList: string[] = [];
    router: Router;
   
    public serviceList: Service[] = [];
    constructor(private Service: Sservice) { }
    ngOnInit() {
        this.serviceList = [];
        this.Service.getService()
            .subscribe(data => {
                this.serviceList = data
                if (this.serviceList) {
                    this.autoComplete()
                }
            });

    }


    public filteredList: string[] = [];
    public ContactIdList: string[] = [];
    public searchContactId = '';
   
    public searchApplicationgroup = '';
    find() {
        this.Service.findService(this.contractId, this.applicationgroup)
            .subscribe(data => {
                this.serviceList = data
            })

    }


    
    notifyContactId(contractid: string) {
        if (event) {
            this.contractId = contractid;
          
        }
    }


    notifyApplication(Service: string) {
        if (event) {
            this.applicationgroup = Service;
        }
    }

    autoComplete() {
        for (var i = 0; i < this.serviceList.length; i++) {
            if (this.ApplicationLists.indexOf(this.serviceList[i].applicationGroup)==-1) {
                this.ApplicationLists.push(this.serviceList[i].applicationGroup);
            }

            if (this.contactIdList.indexOf(this.serviceList[i].contractId.toString())==-1) {
                this.contactIdList.push(this.serviceList[i].contractId.toString());
            }
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
        this.serviceList.push(item);
    }

    popItem() {
        this.popped.push(this.serviceList.pop());
    }
}
    



