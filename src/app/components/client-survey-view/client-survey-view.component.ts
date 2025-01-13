import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientVotingService } from '../../services/client-voting.service';
@Component({
  selector: 'app-client-survey-view',
  imports: [],
  templateUrl: './client-survey-view.component.html',
  styleUrl: './client-survey-view.component.scss'
})
export class ClientSurveyViewComponent {
  id: string | null = '';

  constructor(private route: ActivatedRoute, private votingService: ClientVotingService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id !== null) {
      this.votingService.fetchSurvey(this.id || '');
    }
  }


}
