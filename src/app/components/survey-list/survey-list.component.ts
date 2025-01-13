import { Component, OnInit } from '@angular/core';
import { HostVotingService } from '../../services/host-voting.service';
import { SurveyDetailDTO } from '../../constants/survey.const';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-survey-list',
  imports: [NgFor, NgIf],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent implements OnInit {

  surveyDetails: SurveyDetailDTO[] = [];

  constructor(private votingService: HostVotingService) {}

  handleDeleteSurvey(surveyId: string): void {
    this.votingService.deleteSurvey(surveyId).subscribe({
      next: (deletedSurvey: any) => {
        this.surveyDetails = this.surveyDetails.filter(survey => survey.surveyId !== surveyId && (survey.surveyId !== deletedSurvey.surveyId));
      },
      error: (e: any) => console.error('Error deleting survey')
    });
  }

  handleToggleSurveyStatus(surveyId: string, status: string): void {
    this.votingService.toggleSurveyStatus(surveyId, status).subscribe({
      next: (survey: any) => {
        const newSurvey = this.surveyDetails.find((survey: SurveyDetailDTO) => survey.surveyId === surveyId);
        if(newSurvey) {
          newSurvey.status = survey.newStatus;
        }
      },
      error: (e: any) => console.error('Error setting survey to live')
    });
  }

  ngOnInit(): void {
    this.votingService.getSurveyDetailList('zsnowdon').subscribe({
      error: (e: any) => console.error('Error fetching survey details', e),
      next: (v: SurveyDetailDTO[]) => this.surveyDetails = v,
      complete: () => console.log(`fetched ${this.surveyDetails.length} surveys`)
    });
  }

}
