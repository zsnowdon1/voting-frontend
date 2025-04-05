import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HostVotingService } from '../../services/host-voting.service';
import { LiveVoteService } from '../../services/live-voting.service';
import { Choice, Question, Survey, SurveyResultResponse, VoteUpdate } from '../../constants/survey.const';
// import surveyData from '../../constants/test-survey.json';
// import testResults from '../../constants/test-results.json';

@Component({
  selector: 'app-view-results',
  imports: [NgxChartsModule],
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewResultsComponent implements OnInit {
  surveyId: string = '';
  survey: Survey = new Survey();
  surveyResults: { [questionId: string]: { [choiceId: string]: number } } = {};
  chartData: { questionId: string; data: any[] }[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Choice';
  showYAxisLabel = true;
  yAxisLabel = 'Votes';

  constructor(private route: ActivatedRoute, private surveyService: HostVotingService, private liveVoteService: LiveVoteService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('surveyId');
      if (id) {
        this.surveyId = id;
        this.initializeLiveResults();
        this.fetchSurvey();
      }
    });
  }

  private initializeLiveResults(): void {
    this.liveVoteService.connectToLiveResults(this.surveyId, 
      (data: SurveyResultResponse) => this.handleInitData(data),
      (data: VoteUpdate) => this.handleUpdateData(data)
    );
  }

  private fetchSurvey(): void {
    this.surveyService.fetchSurvey(this.surveyId).subscribe({
      error: (e: any) => console.error('Error fetching survey details', e),
      next: (v: Survey) => {
        this.survey = v;
        this.cdRef.detectChanges();
      },
      complete: () => console.log(`fetched survey ${this.survey.surveyId}`)
    });
  }

  private onSelect(event: any): void {

  }

  private handleInitData(data: SurveyResultResponse): void {
    if (data.resultMap && typeof data.resultMap === 'object') {
      this.surveyResults = data.resultMap;
      this.cdRef.detectChanges();
    } else {
      console.error('Invalid resultMap data received:', data.resultMap);
    }
  }

  private handleUpdateData(data: VoteUpdate): void {
    if (data.questionId && data.choiceId && data.votes != null) {
        const questionResults = this.surveyResults[data.questionId] || {};
        questionResults[data.choiceId] = data.votes;
        this.surveyResults[data.questionId] = questionResults;
        this.cdRef.detectChanges();
    } else {
        console.error('Invalid update data received:', data);
    }
}


  getChartData(questionId: string): any[] {
    if (questionId && this.surveyResults) {
      const choiceObj = this.surveyResults[questionId];
      if (!choiceObj) return [];
      return Object.entries(choiceObj).map(([choiceId, voteCount]) => ({
        name: choiceId,
        value: voteCount
      }));
    }
    return [];
  }

}
