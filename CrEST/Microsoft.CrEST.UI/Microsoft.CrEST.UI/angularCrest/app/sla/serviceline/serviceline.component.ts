import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { Sservice } from "../shared/services/service.service";
import { Service } from "../shared/models/service";

@Component({
    selector: 'sla-service',
    templateUrl: './serviceline.component.html' 
})


export class SlaServiceComponent {
    public sample: string = "";
    //Foreach(var x in ayyy)
    serviceline: string = "Sla Service";

    public contactId = '';
    public contractid = '';
    public serviceLine = '';
    public applicationgroup = '';
    public id: string;
    public states: any = [];
    public supplier = '';

    public contactdetails: string[] = [];
    public contactIdList: string[] = [];
    public servicelineList: string[] = [];
    public ApplicationLists: string[] = [];
    public SupplierList:string[]=[];
    //public applicationList: Application[] = [];
    router: Router;
    //constructor(private http: Http, _router: Router, private Sservice: Sservice) {
    //    this.router = _router;

    public serviceList: Service[] = [];
   // public serviceData: string[] = [];
    constructor(private Service: Sservice) { }
    ngOnInit() {
        this.serviceList = [];
        //this.serviceData = [];
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
   // public searchServiceLine = '';
    public searchApplicationgroup = '';
    find() {

        this.searchContactId = this.contractid.trim();
                //this.searchServiceLine = this.serviceLine.trim();
        this.searchApplicationgroup = this.applicationgroup.trim();
    }


    //edit(id: any) {
    //    alert(id + "the value should be")

    //    this.id = id;
    //    this.router.navigate(['/applications', this.id]);
    //}
    notifyContactId(contractid: string) {
        if (event) {
            this.contractid = contractid;
        }
    }


    //notifySupplier(supplier: string) {
    //    if (event) {
    //        this.supplier = supplier;
    //    }
    //}

    notifyApplication(Service: string) {
        if (event) {
            this.applicationgroup = Service;
        }
    }

    autoComplete() {
        for (var i = 0; i < this.serviceList.length; i++) {
            this.ApplicationLists.push(this.serviceList[i].ApplicationGroup);
            this.contactIdList.push(this.serviceList[i].contractid);
            //this.SupplierList.push(this.serviceList[i].supplier);
        }
    }

}
    


    //filter() {
    //    if (this.query !== "") {
    //        this.filteredList = this.countries.filter(function (el) {
    //            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    //        }.bind(this));
    //    } else {
    //        this.filteredList = [];
    //    }
    //}

    //select(item) {
    //    this.query = item;
    //    this.filteredList = [];
    //}


