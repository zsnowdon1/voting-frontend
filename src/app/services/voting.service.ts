import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export class VotingService {

    private hostURL = 'http://localhost:8081';
    private clientURL = 'http://localhost:8082';

    constructor(private httpClient: HttpClient) {

    }

    fetchSurvey(surveyId: string) {
        this.httpClient.get(`/surveys/${surveyId}`);
    }

}