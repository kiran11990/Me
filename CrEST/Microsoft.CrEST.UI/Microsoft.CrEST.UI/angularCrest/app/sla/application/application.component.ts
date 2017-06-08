import {ChangeDetectionStrategy, Component, Input,OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApplicationData } from "../shared/models/applicationData";
import { ApplicationService } from "./../shared/services/application.service";
import { PaginationInstance } from 'ngx-pagination';


@Component({
    selector: 'sla-application',
    template: require('./application.component.html'),
    changeDetection: ChangeDetectionStrategy.Default
})
export class SlaApplicationComponent implements OnInit {
    
    sla_application: "Sla Application";
    public contactId = '';
    public serviceLine = '';
    public application = '';
    public id: string;
    public SaveSucessfull: boolean = false;
    public states: any = [];

    public contactdetails: string[] = [];
    public contactIdList: string[] = [];
    public servicelineList: string[] = [];
    public ApplicationLists: string[] = [];
    public applicationList: ApplicationData[] = [];
    router: Router;
    public filter: string = '';
    public maxSize: number = 7;
    public directionLinks: boolean = true;
    public autoHide: boolean = false;
    constructor(private http: Http, _router: Router, private applicationService: ApplicationService, private _routeParameterd: ActivatedRoute) {
        this.router = _router;
       
    }

    ngOnInit() {
        if (this._routeParameterd.snapshot.params['applicationStatus']) {
            //this.getApplicationList();
            this.SaveSucessfull = true;
        }
        this.getApplicationList();
       
    }

    getApplicationList() {
        this.applicationService.getApplications()
            .subscribe(data => {
                this.applicationList = [];
                this.applicationList = data
                if (this.applicationList) {
                    this.autoComplete();
                }
            });
    }

    public filteredList: string[] = [];
    public ContactIdList: string[] = [];
    public searchContactId = '';
    public searchServiceLine = '';
    public searchApplication = '';
    find() {
        this.applicationService.findApplication(this.contactId, this.serviceLine, this.application)
            .subscribe(data => {
                this.applicationList = data
            })
       
    }

    notifyContactId(ContactId: string) {
        if (event) {
            this.contactId = ContactId;
        }
    }


    notifyServiceLine(serviceLine: string) {
        if (event) {
            this.serviceLine = serviceLine;
        }
    }

    notifyApplication(Application: string) {
        if (event) {
            this.application = Application;
        }
    }

    autoComplete() {
        for (var i = 0; i < this.applicationList.length; i++) {

            if (this.ApplicationLists.indexOf(this.applicationList[i].application)==-1) {

                this.ApplicationLists.push(this.applicationList[i].application);
            }

            if (this.contactIdList.indexOf(this.applicationList[i].contractId.toString()) == -1) {
                this.contactIdList.push(this.applicationList[i].contractId.toString());

            }

            if (this.servicelineList.indexOf(this.applicationList[i].serviceLine) == -1) {
                this.servicelineList.push(this.applicationList[i].serviceLine);

            }
          
            
            
        }
    }


    
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
        this.applicationList.push(item);
    }

    popItem() {
        this.popped.push(this.applicationList.pop());
    }

    
}

