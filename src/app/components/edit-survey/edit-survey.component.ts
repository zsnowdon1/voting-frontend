import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Survey, Choice, Question } from '../../constants/survey.const';
import { NgFor } from '@angular/common';
import { HostVotingService } from '../../services/host-voting.service';

@Component({
  selector: 'app-edit-survey',
  imports: [FormsModule, NgFor],
  templateUrl: './edit-survey.component.html',
  styleUrl: './edit-survey.component.scss',
  standalone: true
})
export class EditSurveyComponent implements OnInit {
  surveyId: string = '';
  survey: Survey = new Survey();
  questionIndex: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private votingService: HostVotingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('surveyId');
      if (id) {
        this.surveyId = id;
        this.fetchSurvey();
      } else {
        console.error('No survey ID provided');
        this.router.navigate(['/survey-list']);
      }
    });
  }

  fetchSurvey(): void {
    this.votingService.fetchSurvey(this.surveyId).subscribe({
      next: (survey: Survey) => {
        this.survey = survey;
        if (!this.survey.questions.length) {
          this.addQuestion();
        }
      },
      error: (e: any) => {
        console.error('Error fetching survey', e);
        this.router.navigate(['/survey-list']);
      }
    });
  }

  handlePrevQuestion(): void {
    if (this.questionIndex > 0) {
      this.questionIndex--;
    }
  }

  handleNextQuestion(): void {
    if (!this.survey.questions[this.questionIndex + 1]) {
      this.addQuestion();
    }
    this.questionIndex++;
  }

  handleUpdateSurvey(): void {
    if (!this.surveyId) {
      console.error('Survey ID is missing');
      return;
    }
    this.votingService.saveSurvey(this.survey).subscribe({
      next: (response: Survey) => {
        this.survey = response;
        console.log('Survey updated successfully', response);
        this.router.navigate(['/survey-list']);
      },
      error: (err) => console.error('Error updating survey', err)
    });
  }

  addQuestion(): void {
    this.survey.questions.push(new Question());
  }

  addChoice(): void {
    this.survey.questions[this.questionIndex].choices.push(new Choice());
  }

  removeChoice(index: number): void {
    if (this.survey.questions[this.questionIndex].choices.length > 1) {
      this.survey.questions[this.questionIndex].choices.splice(index, 1);
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}