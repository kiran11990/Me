import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
    pageContent: String = "This is one stop application for CrEST PMO Tool";

    constructor(private _router: Router)
    {
       
    }
       
    ngOnInit() {
        let route = ['/home/sladashboard']; this._router.navigate(route);
    }
}