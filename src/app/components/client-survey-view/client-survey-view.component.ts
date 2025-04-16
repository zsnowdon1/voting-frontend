import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientVotingService } from '../../services/client-voting.service';
import { Question, SelectedChoice, SubmitSurveyRequest, Survey } from '../../constants/survey.const';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-client-survey-view',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './client-survey-view.component.html',
  styleUrl: './client-survey-view.component.scss'
})
export class ClientSurveyViewComponent implements OnInit {
  accessCode: string | null = null;
  survey: Survey | null = null;
  submitSurveyRequest: SubmitSurveyRequest = new SubmitSurveyRequest();
  selectedChoices: SelectedChoice[] = [];

  constructor(private route: ActivatedRoute, private votingService: ClientVotingService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.accessCode = params['accessCode'];
      if(this.accessCode) {
        this.votingService.fetchSurvey(this.accessCode).subscribe({
          next: (survey: any) => {
            this.survey = survey;
            this.submitSurveyRequest.surveyId = survey.surveyId;
          },
          error: (e: any) => {
            console.error(`Error fetching survey with access code: ${this.accessCode}`);
          }
        });
      }
    });
  }

  isChoiceSelected(questionId: any, choiceId: any): boolean {
    const qId = String(questionId);
    const cId = String(choiceId);
    return this.selectedChoices.some(
      (response: SelectedChoice) => String(response.questionId) === qId && String(response.choiceId) === cId
    );
  }

  updateResponse(questionId: string, choiceId: string): void {
    const existingResponseIndex = this.selectedChoices.findIndex(
      response => response.questionId === questionId
    );

    if (existingResponseIndex !== -1) {
      this.selectedChoices[existingResponseIndex].choiceId = choiceId;
    } else {
      this.selectedChoices.push(new SelectedChoice(questionId, choiceId));
    }

    this.submitSurveyRequest.responses = [...this.selectedChoices];
    console.log('Updated selectedChoices:', this.selectedChoices);
  }
  
  isSurveyComplete(): boolean {
    if (!this.survey || !this.survey.questions.length) return false;
    return this.survey.questions.every(q =>
      this.selectedChoices.some(response => String(response.questionId) === String(q.questionId))
    );
  }

  submitSurvey(): void {
    if (!this.survey) return;
    this.submitSurveyRequest.responses = [...this.selectedChoices];
    this.votingService.submitSurvey(this.submitSurveyRequest).subscribe({
      next: () => console.log('Survey submitted successfully'),
      error: (error) => console.error('Error submitting survey:', error),
      complete: () => console.log('Submission process completed')
    });
  }

}
