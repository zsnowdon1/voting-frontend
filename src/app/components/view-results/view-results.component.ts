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
    const surveyId = this.route.snapshot.paramMap.get('surveyId');
    if(surveyId !== null) {
      this.liveVoteService.connectToLiveResults(surveyId, 
        (data) => this.handleInitData(data),
        (data) => this.handleUpdateData(data)
      );
    }
  }

  handleInitData(data: any): void {
    console.log(data);
  }

  handleUpdateData(data: any): void {
    console.log(data);
  }

}
