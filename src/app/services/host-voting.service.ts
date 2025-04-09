import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Survey } from "../constants/survey.const";
import { HOST_URL } from "../constants/routes.const";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HostVotingService {

    constructor(private httpClient: HttpClient) {}

    fetchSurvey(surveyId: string): Observable<any> {
        return this.httpClient.get(HOST_URL + `/${surveyId}`);
    }

    createSurvey(survey: Survey): Observable<any> {
        return this.httpClient.post(HOST_URL, survey);
    }

    saveSurvey(survey: Survey): Observable<any> {
        return this.httpClient.put(HOST_URL + `/${survey.surveyId}`, survey);
    }

    getSurveyDetailList(hostName: string): Observable<any> {
        const httpParams = new HttpParams({ fromObject: { hostUsername: `${hostName}` } });
        return this.httpClient.get(HOST_URL, { params: httpParams });
    }

    deleteSurvey(surveyId: string): Observable<any> {
        return this.httpClient.delete(HOST_URL + `/${surveyId}`);
    }

    toggleSurveyStatus(surveyId: string, status: string): Observable<any> {
        return this.httpClient.put(HOST_URL + `/${surveyId}/status`, null, { params: { status } });
    }

    handleSaveSurvey(survey: Survey): Observable<Survey> {
        if(survey.surveyId == '') {
            return this.createSurvey(survey);
        } else {
            return this.saveSurvey(survey);
        }
    }

}