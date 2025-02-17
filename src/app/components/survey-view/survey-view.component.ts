import { Component } from '@angular/core';
import { HostVotingService } from '../../services/host-voting.service';

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrl: './survey-view.component.scss'
})
export class SurveyViewComponent {

  constructor(private votingService: HostVotingService) {}
  
  ngOnInit() {
    console.log(this.votingService.fetchSurvey('1'));
  }

}
