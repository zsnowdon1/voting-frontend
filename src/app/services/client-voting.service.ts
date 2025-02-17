import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CLIENT_URL, SUBMIT_SURVEY_ENDPOINT } from "../constants/routes.const";
import { SubmitSurveyRequest } from "../constants/survey.const";

@Injectable({
    providedIn: 'root'
})
export class ClientVotingService {

    constructor(private httpClient: HttpClient) {}

    fetchSurvey(accessCode: string): Observable<any> {
        const params = new HttpParams().set('accessCode', accessCode);
        return this.httpClient.get(CLIENT_URL, { params });
    }

    submitSurvey(submitRequest: SubmitSurveyRequest): Observable<any> {
        return this.httpClient.post(CLIENT_URL + SUBMIT_SURVEY_ENDPOINT, submitRequest);
    }

}