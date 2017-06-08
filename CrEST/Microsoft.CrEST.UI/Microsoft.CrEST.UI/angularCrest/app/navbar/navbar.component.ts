import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'crest-nav-bar',
    templateUrl: './navbar.component.html',
})

export class NavigationComponent {
    loggedUser: string = (localStorage.getItem('currentUser')).toString().replace(/"/g, ' ').trim();

    constructor(private router: Router) { }  

    logout() {
        localStorage.removeItem('currentUser');        
        this.router.navigateByUrl('/login');
    };
}