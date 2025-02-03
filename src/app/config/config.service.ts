import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigService {
    private baseUrl: string = "http://65.1.91.43:3000";
    constructor(private http: HttpClient) { }

    login(body: any): Observable<any> {
        return this.http.post(this.baseUrl + "/login", body);
    }
}