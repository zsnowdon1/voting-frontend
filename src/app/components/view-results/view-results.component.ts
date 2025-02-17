import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostVotingService } from '../../services/host-voting.service';
import { LiveVoteService } from '../../services/live-voting.service';
// import { error } from 'console';

@Component({
  selector: 'app-view-results',
  imports: [],
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.scss'
})
export class ViewResultsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private surveyService: HostVotingService, private liveVoteService: LiveVoteService) {}

  ngOnInit(): void {
    // this.surveyService.fetchSurvey('6799716ae17ddc2d3273ac67').subscribe(
    //   (error): console.log('test');
    // );
    this.liveVoteService.connectToLiveResults('6799716ae17ddc2d3273ac67', 
      (data) => this.handleInitData(data),
      (data) => this.handleUpdateData(data)
    );
  }

  handleInitData(data: any): void {

  }

  handleUpdateData(data: any): void {

  }

}
