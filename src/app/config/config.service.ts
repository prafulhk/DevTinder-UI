import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigService {
    private baseUrl: string = "http://localhost:3000";
    constructor(private http: HttpClient) { }

    login(body: any): Observable<any> {
        return this.http.post(this.baseUrl + "/login", body);
    }
}