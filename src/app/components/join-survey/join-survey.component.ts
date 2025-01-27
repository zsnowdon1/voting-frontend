import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CLIENT_SURVEY_ROUTE } from '../../constants/routes.const';

@Component({
  selector: 'app-join-survey',
  imports: [FormsModule],
  templateUrl: './join-survey.component.html',
  styleUrl: './join-survey.component.scss'
})
export class JoinSurveyComponent {

  surveyCode: string = '';

  constructor(private router: Router) {}

  handleJoinSurvey() {
    this.router.navigate([CLIENT_SURVEY_ROUTE], { queryParams: { accessCode: this.surveyCode } });
  }
}
