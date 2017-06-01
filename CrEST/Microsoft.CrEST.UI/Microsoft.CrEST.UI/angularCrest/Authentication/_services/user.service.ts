/// <reference path="../../app/config/constants.service.ts" />
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConstantService } from '../../app/config/constants.service';
import { User } from '../_models/user';

@Injectable()
export class UserService {
    public validateUserbyURL: string;

    constructor(private _constantService: ConstantService, private http: Http) {
        this.validateUserbyURL = _constantService.CONFIG.apiLocations.ValidateUsers;
    }

   
    validateUser(username: string, password: string) {
        return this.http.get(this.validateUserbyURL + username + "/" + password)
            .map(res => res.json());
    }

    

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}