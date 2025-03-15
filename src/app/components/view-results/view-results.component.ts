import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HostVotingService } from '../../services/host-voting.service';
import { LiveVoteService } from '../../services/live-voting.service';
import { Choice, Question, Survey, SurveyResultResponse } from '../../constants/survey.const';
import surveyData from '../../constants/test-survey.json';
import testResults from '../../constants/test-results.json';

@Component({
  selector: 'app-view-results',
  imports: [NgxChartsModule],
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.scss'
})
export class ViewResultsComponent implements OnInit {
  surveyId: string = '';
  survey: Survey = new Survey();
  surveyResults: Map<string, Map<string, number>> = new Map();
  chartData: { questionId: string; data: any[] }[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Choice';
  showYAxisLabel = true;
  yAxisLabel = 'Votes';

  constructor(private route: ActivatedRoute, private surveyService: HostVotingService, private liveVoteService: LiveVoteService,) {}

  ngOnInit(): void {
    this.survey = surveyData as Survey;
    this.parseSurveyResults(testResults);
    console.log(this.surveyResults);
    console.log(this.survey);
    // this.route.paramMap.subscribe(params => {
    //   this.surveyId = params.get('surveyId') || '';
    // });
    // if(this.surveyId !== null) {
    //   this.liveVoteService.connectToLiveResults(this.surveyId, 
    //     (data) => this.handleInitData(data),
    //     (data) => this.handleUpdateData(data)
    //   );
    //   this.surveyService.fetchSurvey(this.surveyId).subscribe({
    //     error: (e: any) => console.error('Error fetching survey details', e),
    //     next: (v: Survey) => this.survey = v,
    //     complete: () => console.log(`fetched survey ${this.survey.surveyId}`)
    //   });
    // }
  }

  parseSurveyResults(results: any): void {
    this.surveyResults = new Map();
  
    if (results.resultMap && typeof results.resultMap === 'object') {
      Object.entries(results.resultMap).forEach(([questionId, choices]) => {
        const choiceMap = new Map<string, number>();
  
        if (choices && typeof choices === 'object') {
          Object.entries(choices).forEach(([choiceId, voteCount]) => {
            choiceMap.set(choiceId, voteCount as number);
          });
        }
  
        this.surveyResults.set(questionId, choiceMap);
      });
    }
  }
  
  getChartData(questionId: string): any[] {
    const choiceMap = this.surveyResults.get(questionId);
    if (!choiceMap) return [];
  
    return Array.from(choiceMap.entries()).map(([choiceId, voteCount]) => ({
      name: choiceId,
      value: voteCount
    }));
  }

  onSelect(event: any): void {

  }

  handleInitData(data: SurveyResultResponse): void {
    this.surveyResults = data.resultMap;
    console.log(this.surveyResults);
  }

  handleUpdateData(data: SurveyResultResponse): void {
    // const value: Map<String, number> = data.resultMap.entries().next().value;
    // if(this.surveyResults.has(value.))
    // console.log(data);
  }

}
