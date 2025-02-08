import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigService {
    localBaseURL: string = "http://localhost:3000";
    deployedBaseURL: string = "http://13.201.137.54:3000";

    private baseUrl: string = this.localBaseURL;
    constructor(private http: HttpClient) { }

    login(emailId: string, password: string): Observable<any> {
        return this.http.post(this.baseUrl + "/login", { emailId, password });        
    }

    logout(emailId: string): Observable<any>{
        return this.http.post(this.baseUrl + "/logout",{emailId});        
    }
}