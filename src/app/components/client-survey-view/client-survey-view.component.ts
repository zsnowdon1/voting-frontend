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
  accessCode: string | null = '';
  survey: Survey = new Survey;
  currentQuestionIndex: number = 0;
  submitSurveyRequest: SubmitSurveyRequest = new SubmitSurveyRequest();
  selectedChoices: SelectedChoice[] = [];

  constructor(private route: ActivatedRoute, private votingService: ClientVotingService) {}

  isChoiceSelected(questionId: string, choiceId: string): boolean {
    return this.selectedChoices.some(
      (response: SelectedChoice) => response.questionId === questionId && response.choiceId === choiceId
    );
  }

  updateResponse(questionId: string, choiceId: string): void {
    // Check if the question already has a response
    const existingResponse = this.selectedChoices.find(
      (response) => response.questionId === questionId
    );

    if (existingResponse) {
      // Update the existing choice
      existingResponse.choiceId = choiceId;
    } else {
      // Add a new response
      this.selectedChoices.push(new SelectedChoice(questionId, choiceId));
    }

    // Sync with submitSurveyRequest.responses
    this.submitSurveyRequest.responses = [...this.selectedChoices];
  }
  
  isSurveyComplete(): boolean {
    return (
      this.survey.questions.length === this.selectedChoices.length &&
      this.survey.questions.every((q: Question) =>
        this.selectedChoices.some((response: SelectedChoice) => response.questionId === q.questionId)
      )
    );
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.survey.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  submitSurvey() {
    this.submitSurveyRequest.responses = this.selectedChoices;
    this.votingService.submitSurvey(this.submitSurveyRequest).subscribe({
        error: (error) => {
          console.log('Error submitting survey:', error);
        },
        complete: () => {
          console.log('Submitted survey');
        }
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.accessCode = params['accessCode'];
      if(this.accessCode !== null) {
        this.votingService.fetchSurvey(this.accessCode || '').subscribe({
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


}
