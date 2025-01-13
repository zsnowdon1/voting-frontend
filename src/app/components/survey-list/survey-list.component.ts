import { Component, OnInit } from '@angular/core';
import { VotingService } from '../../services/voting.service';
import { SurveyDetailDTO } from '../../constants/survey.const';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-survey-list',
  imports: [NgFor],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent implements OnInit {

  surveyDetails: SurveyDetailDTO[] = [];

  constructor(private votingService: VotingService) {}

  handleDeleteSurvey(surveyId: String): void {
    this.votingService.deleteSurvey(surveyId).subscribe({
      next: (deletedSurvey) => {
        this.surveyDetails = this.surveyDetails.filter(survey => survey.surveyId !== surveyId && (survey.surveyId !== deletedSurvey.surveyId));
      },
      error: (e) => console.error('Error deleting survey')
    });
  }

  ngOnInit(): void {
    this.votingService.getSurveyDetailList('zsnowdon').subscribe({
      error: (e) => console.error('Error fetching survey details', e),
      next: (v: SurveyDetailDTO[]) => this.surveyDetails = v,
      complete: () => console.log(`fetched ${this.surveyDetails.length} surveys`)
    });
  }

}
