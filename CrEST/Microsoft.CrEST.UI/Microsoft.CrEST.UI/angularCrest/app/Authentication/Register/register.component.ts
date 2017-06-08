import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validation';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
@Component({  
    templateUrl: 'register.component.html',
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    form: FormGroup;
    constructor(fb: FormBuilder, private router: Router,
        private userService: UserService, private alertservice: AlertService) {
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            roletype: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
                validator: PasswordValidation.MatchPassword 
            })
            
    }  
    

    register() {
        this.loading = true;       
        this.userService.registerUser(this.model.username, this.model.password, this.model.roleid)
            .subscribe(
            data => {
                    this.alertservice.success('Registration successful', true);                   
                    this.router.navigate(['/login']);
            },
            error => {
                    this.alertservice.error(error);
                    this.loading = false;
                });       
    }
}
