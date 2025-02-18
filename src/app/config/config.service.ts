import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigService {
    localBaseURL: string = "http://localhost:3001";
    deployedBaseURL: string = "http://13.201.137.54:3000";

    private baseUrl: string = this.localBaseURL;
    constructor(private http: HttpClient) { }

    signup(signupForm:any): Observable<any> {
        const {firstName,lastName,emailId,password} = signupForm;
        return this.http.post(this.baseUrl + "/signup", {firstName,lastName,emailId,password});
    }

    login(emailId: string, password: string): Observable<any> {
        return this.http.post(this.baseUrl + "/login", { emailId, password });
    }

    logout(emailId: string): Observable<any> {
        return this.http.post(this.baseUrl + "/logout", { emailId });
    }

    // updateProfile(userId: string, firstName: string, lastName: string, gender: string, dob: string,photoURL:String): Observable<any> {
    //     return this.http.patch(this.baseUrl + "/user/profile/update", { userId, firstName, lastName, gender, dob,photoURL },{ withCredentials: true });
    // }

    updateProfile(profileForm:any): Observable<any> {
        return this.http.patch(this.baseUrl + "/user/profile/update", profileForm,{ withCredentials: true });
    }

    fetchFeed(): Observable<any> {
        return this.http.get(this.baseUrl + "/feed");
    }

    fetchConnections(): Observable<any> {
        return this.http.get(this.baseUrl + "/user/connections");
    }

    fetchRecievedRequests(): Observable<any> {
        return this.http.get(this.baseUrl + "/user/request/recieved");
    }

    sendRequest(status: string, fromUserId: string): Observable<any> {
        return this.http.post(this.baseUrl + "/request/send/" + status + "/" + fromUserId, {});
    }

    reviewRequest(status: string, requestId: string): Observable<any> {
        return this.http.post(this.baseUrl + "/request/review/" + status + "/" + requestId, {});
    }


}