import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HostVotingService } from '../../services/host-voting.service';
import { LiveVoteService } from '../../services/live-voting.service';
import { Survey, SurveyResultResponse } from '../../constants/survey.const';
// import { error } from 'console';

@Component({
  selector: 'app-view-results',
  imports: [NgxChartsModule],
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.scss'
})
export class ViewResultsComponent implements OnInit {
  surveyId: string = '';
  survey: Survey = new Survey();
  surveyResults: SurveyResultResponse[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  constructor(private route: ActivatedRoute, private surveyService: HostVotingService, private liveVoteService: LiveVoteService) {}

  ngOnInit(): void {
    console.log('Working view results');
    this.route.paramMap.subscribe(params => {
      this.surveyId = params.get('surveyId') || '';
    });
    if(this.surveyId !== null) {
      this.liveVoteService.connectToLiveResults(this.surveyId, 
        (data) => this.handleInitData(data),
        (data) => this.handleUpdateData(data)
      );
      this.surveyService.fetchSurvey(this.surveyId).subscribe({
        error: (e: any) => console.error('Error fetching survey details', e),
        next: (v: Survey) => this.survey = v,
        complete: () => console.log(`fetched survey ${this.survey.surveyId}`)
      });
    }
  }

  onSelect(event: any): void {

  }

  handleInitData(data: SurveyResultResponse[]): void {
    console.log(data);
  }

  handleUpdateData(data: SurveyResultResponse[]): void {
    console.log(data);
  }

}
