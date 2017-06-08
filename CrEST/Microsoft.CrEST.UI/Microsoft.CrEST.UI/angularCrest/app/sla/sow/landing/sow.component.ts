import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SowService } from "../../shared/services/sows.service";
import { Sow } from "../../shared/models/sow";
import { PaginationInstance } from 'ngx-pagination';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'sow-grid',
    templateUrl: './sow.component.html',
})

export class SowComponent {
    private sows: Sow[] = [];

    constructor(private sowService: SowService, private _routeParameterd: ActivatedRoute) { }

    public contractid = '';
    public serviceLine = '';
    public msOwnerAlias = '';
    public contractID = '';
    public application = '';
    public owneralias = '';
    public ItOrg: any;
    public itOrg="";
    public contractIDList: string[] = [];
    public ItOrgList: string[] = [];
    public msOwnerAliasList: string[] = [];
   public searchContractId = '';
   public searchServiceLine = '';
   public searchMsowner = '';


   ngOnInit() {
       if (this._routeParameterd.snapshot.params['sowStatus']) {
           //this.getAllServices();
          
       }

       this.getAllServices();
    }
   getAllServices() {
       this.sowService.getSows()
           .subscribe(data => {
               this.sows = data
               if (this.sows) {
                   this.autoComplete();
               }
           });
   }

    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    find() {
        this.sowService.findSow(this.contractID, this.itOrg, this.msOwnerAlias)
            .subscribe(data => {
                this.sows = data
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
            this.contractID = contractID;
        }
    }

    notifyItOrg(ItOrg: string) {
        if (event) {
            this.itOrg = ItOrg;
        }
    }

    notifymsOwnerAlias(msOwnerAlias: string) {
        if (event) {
            this.msOwnerAlias = msOwnerAlias;
        }
    }

    autoComplete() {
        for (var i = 0; i < this.sows.length; i++) {
            if (this.contractIDList.indexOf(this.sows[i].contractId.toString()) == -1) {
                this.contractIDList.push(this.sows[i].contractId.toString());
            }
            if (this.ItOrgList.indexOf(this.sows[i].itorgName)==-1) {
                this.ItOrgList.push(this.sows[i].itorgName);
            }
            if (this.msOwnerAliasList.indexOf(this.sows[i].infyOwner) == -1) {
                this.msOwnerAliasList.push(this.sows[i].infyOwner);
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
        this.sows.push(item);
    }

    popItem() {
        this.popped.push(this.sows.pop());
    }
}