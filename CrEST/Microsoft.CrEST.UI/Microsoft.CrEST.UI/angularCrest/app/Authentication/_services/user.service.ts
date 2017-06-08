import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConstantService } from '../../config/constants.service';
import { User } from '../_models/user';
import { CommonService } from '../../shared/common.service';

@Injectable()
export class UserService {
    public validateUserbyURL: string;
    public registerUserInfobyURL: string;

    constructor(private _constantService: ConstantService, private commonService: CommonService, private http: Http) {
        this.validateUserbyURL = _constantService.CONFIG.apiLocations.ValidateUsers;
        this.registerUserInfobyURL = _constantService.CONFIG.apiLocations.RegisterUser;
    }

   
    validateUser(username: string, password: string) {
        return this.http.get(this.validateUserbyURL + username + "/" + password)
            .map(res => res.json()).catch(this.commonService.handleError);
    }

    registerUser(username: string, password: string, roleName: string ) {
        return this.http.post(this.registerUserInfobyURL + username + "/" + password + "/" + roleName, JSON.stringify(''))
            .map((res: any) => res.json()).catch(this.commonService.handleError);
    }   
}