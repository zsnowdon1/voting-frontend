import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClientVotingService {

    constructor(private httpClient: HttpClient) {}

    fetchSurvey(surveyId: string): Observable<any> {
        return this.httpClient.get(`/surveys/${surveyId}`);
    }

}