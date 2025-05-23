import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Survey } from '../../constants/survey.const';
import { NgFor, NgIf } from '@angular/common';
import { HostVotingService } from '../../services/host-voting.service';

@Component({
  selector: 'app-create-survey',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})
export class CreateSurveyComponent implements OnInit {
  questionIndex: number = 0;
  survey: Survey = new Survey;

  // Route to login when not signed in, with return url of create survey
  constructor(private router: Router, private votingService: HostVotingService) { }

  ngOnInit(): void {
    this.survey = new Survey();
    this.survey.hostUsername = 'zsnowdon';
    this.survey.questions.push({
      questionText: '', choices: [{
        choiceText: '',
        choiceId: ''
      }],
      questionId: ''
    });
  }

  handlePrevQuestion() {
    if(this.questionIndex > 0) {
      this.questionIndex--;
    }
  }

  handleNextQuestion() {
    if(!this.survey.questions[this.questionIndex + 1]) {
      this.addQuestion();
    }
    this.questionIndex++;
  }

  handleSaveSurvey() {
    this.votingService.handleSaveSurvey(this.survey).subscribe({
      next: (response: Survey) => {
        this.survey = response;
        console.log('Survey submitted successfully', response);
      },
      error: (err) => {
        console.error('Error submitting survey');
      },
    });
  }

  addQuestion() {
    this.survey.questions.push({
      questionText: '', choices: [{
        choiceText: '',
        choiceId: ''
      }],
      questionId: ''
    });
  }

  addChoice() {
    this.survey.questions[this.questionIndex].choices.push({
      choiceText: '',
      choiceId: ''
    });
  }

  removeChoice(index: number) {
    if (this.survey.questions[this.questionIndex].choices.length > 1) {
      this.survey.questions[this.questionIndex].choices.splice(index, 1);
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
