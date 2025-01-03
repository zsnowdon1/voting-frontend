import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Survey } from "../constants/survey.const";
import { HOST_URL, SURVEYS_ENDPOINT } from "../constants/routes.const";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class VotingService {

    constructor(private httpClient: HttpClient) {}

    fetchSurvey(surveyId: string): Observable<any> {
        return this.httpClient.get(`/surveys/${surveyId}`);
    }

    createSurvey(survey: Survey): Observable<any> {
        return this.httpClient.post(HOST_URL + SURVEYS_ENDPOINT, survey);
    }

    saveSurvey(survey: Survey): Observable<any> {
        return this.httpClient.post(HOST_URL + SURVEYS_ENDPOINT + `/${survey.surveyId}`, survey);
    }

    handleSaveSurvey(survey: Survey): Observable<Survey> {
        if(survey.surveyId == undefined) {
            return this.createSurvey(survey);
        } else {
            return this.saveSurvey(survey);
        }
    }

}