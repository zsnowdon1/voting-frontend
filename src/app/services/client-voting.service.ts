import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CLIENT_URL } from "../constants/routes.const";

@Injectable({
    providedIn: 'root'
})
export class ClientVotingService {

    constructor(private httpClient: HttpClient) {}

    fetchSurvey(accessCode: string): Observable<any> {
        const params = new HttpParams().set('accessCode', accessCode);
        return this.httpClient.get(CLIENT_URL, { params });
    }

}