import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({       
    selector: 'alert',
    templateUrl: 'alert.component.html', 
})


export class AlertComponent implements OnInit {
    message: any;

    constructor(private route: ActivatedRoute,
        private router: Router,private alertService: AlertService ) { }

    ngOnInit() {        
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}