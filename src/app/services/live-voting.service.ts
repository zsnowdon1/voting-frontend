import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST_URL, LIVE_VOTE_ENDPOINT } from '../constants/routes.const';
import { SurveyResultResponse } from '../constants/survey.const';

@Injectable({
  providedIn: 'root',
})
export class LiveVoteService {
    private eventSource?: EventSource;
  
    constructor(private zone: NgZone) {}
  
    connectToLiveResults(surveyId: string, onInitialData: (data: SurveyResultResponse) => void, onVoteUpdate: (data: any) => void): void {
      this.eventSource = new EventSource(HOST_URL + LIVE_VOTE_ENDPOINT + `/${surveyId}`);
  
      // Listen for the 'initial-data' event
      this.eventSource.addEventListener('initial-data', (event: MessageEvent) => {
        this.zone.run(() => {
          const data = JSON.parse(event.data);
          onInitialData(data);
        });
      });
  
      // Listen for the 'vote-update' event
      this.eventSource.addEventListener('vote-update', (event: MessageEvent) => {
        this.zone.run(() => {
          const data = JSON.parse(event.data);
          onVoteUpdate(data);
        });
      });
  
      // Handle errors
      this.eventSource.onerror = (error) => {
        console.error('EventSource error: ', error);
        this.disconnect();
      };
    }
  
    disconnect(): void {
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = undefined;
      }
    }
  }
