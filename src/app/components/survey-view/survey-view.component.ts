import { Component } from '@angular/core';
import { VotingService } from '../../services/voting.service';

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrl: './survey-view.component.scss'
})
export class SurveyViewComponent {

  constructor(private votingService: VotingService) {}
  
  ngOnInit() {
    console.log(this.votingService.fetchSurvey('1'));
  }

}
