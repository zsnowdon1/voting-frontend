import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Survey } from '../../constants/survey.const';
import { NgFor } from '@angular/common';
import { VotingService } from '../../services/voting.service';

@Component({
  selector: 'app-create-survey',
  imports: [FormsModule, NgFor],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})
export class CreateSurveyComponent implements OnInit {

  questionIndex: number = 0;

  survey: Survey;

  // Route to login when not signed in, with return url of create survey
  constructor(private router: Router, private votingService: VotingService) { }

  ngOnInit(): void {
    this.survey = new Survey();
    this.survey.questions.push({
      questionText: '', choices: [{choiceText: ''}]
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
    this.survey.questions.push({questionText: '', choices: [{choiceText: ''}]});
  }

  addChoice() {
    this.survey.questions[this.questionIndex].choices.push({choiceText: ''});
  }

}
