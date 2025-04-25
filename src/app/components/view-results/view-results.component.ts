import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HostVotingService } from '../../services/host-voting.service';
import { LiveVoteService } from '../../services/live-voting.service';
import { Choice, Question, Survey, SurveyResultResponse, VoteUpdate } from '../../constants/survey.const';

interface SurveyResult {
  questionId: string;
  choices: Map<string, number>;
}

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
  surveyResults: Map<string, SurveyResult> = new Map();
  chartDimensions: [number, number] = [600, 400];

  constructor(
    private route: ActivatedRoute,
    private surveyService: HostVotingService,
    private liveVoteService: LiveVoteService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('surveyId');
      if (id) {
        this.surveyId = id;
        this.initializeLiveResults();
        this.fetchSurvey();
      }
    });

    this.updateChartDimensions();
    window.addEventListener('resize', () => this.updateChartDimensions());
  }

  private initializeLiveResults(): void {
    this.liveVoteService.connectToLiveResults(
      this.surveyId,
      (data: SurveyResultResponse) => this.handleInitData(data),
      (data: VoteUpdate) => this.handleUpdateData(data)
    );
  }

  private fetchSurvey(): void {
    this.surveyService.fetchSurvey(this.surveyId).subscribe({
      next: (survey: Survey) => {
        this.survey = survey;
        this.cdRef.detectChanges();
      },
      error: (error: any) => console.error('Error fetching survey details', error),
      complete: () => console.log(`Fetched survey ${this.survey.surveyId}`)
    });
  }

  private handleInitData(data: SurveyResultResponse): void {
    console.log('Raw initial data received:', JSON.stringify(data, null, 2));
    if (data.resultMap && typeof data.resultMap === 'object') {
      this.surveyResults.clear();
      Object.entries(data.resultMap).forEach(([questionId, choices]) => {
        const choiceMap = new Map<string, number>(
          Object.entries(choices).map(([choiceId, count]) => [
            choiceId.replace(/^"|"$/g, ''), // Remove leading/trailing quotes
            count
          ])
        );
        this.surveyResults.set(questionId, { questionId, choices: choiceMap });
      });
      console.log('Processed surveyResults:', this.surveyResults);
      this.cdRef.detectChanges();
    } else {
      console.error('Invalid resultMap data received:', data.resultMap);
    }
  }

  private handleUpdateData(data: VoteUpdate): void {
    if (data.questionId && data.choiceId && data.total != null) {
      const result = this.surveyResults.get(data.questionId) || {
        questionId: data.questionId,
        choices: new Map<string, number>()
      };
      result.choices.set(data.choiceId, data.total);
      this.surveyResults.set(data.questionId, result);
      this.cdRef.detectChanges();
    } else {
      console.error('Invalid update data received:', data);
    }
  }

  getChartData(question: Question): any[] {
    if (!question.questionId) {
      console.error('Question ID is undefined');
      return [];
    }
    const result = this.surveyResults.get(question.questionId);
    if (!result) return [];
    return question.choices.map(choice => ({
      name: choice.choiceText,
      value: result.choices.get(choice.choiceId) || 0
    }));
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  private updateChartDimensions(): void {
    const width = Math.min(window.innerWidth - 40, 800); // Adjust for padding and max width
    const height = Math.max(300, width * 0.66); // Maintain aspect ratio
    this.chartDimensions = [width, height];
    this.cdRef.detectChanges();
  }
}