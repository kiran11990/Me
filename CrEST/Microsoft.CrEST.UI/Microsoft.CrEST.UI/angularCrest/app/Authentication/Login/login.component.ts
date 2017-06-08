import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { UserService } from "../_services/user.service";

@Component({  
    selector: 'login-page',
    templateUrl: './login.component.html',     
})

export class LoginComponent implements OnInit {
    
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
    )
        { }

    ngOnInit() {
       
    }

    login() {        
        this.loading = true;        
        this.userService.validateUser(this.model.username, this.model.password)
            .subscribe(
            data => {
				if (data == 1) {
                    localStorage.setItem('currentUser', JSON.stringify(this.model.username));                    
                    this.router.navigate(['/home']);
                }
                else if (data ==0) {
                    this.loading = false;
                    this.alertService.error('Invalid Username', false);
                    this.router.navigate(['/login']);
                }
            } ,
                error => {
                    this.alertService.error(error);
                    this.loading = false;                
                });
    }
}
