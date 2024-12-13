import { Component } from '@angular/core';
import { VotingService } from '../../services/voting.service';

@Component({
  selector: 'app-survey-view',
  imports: [VotingService],
  templateUrl: './survey-view.component.html',
  styleUrl: './survey-view.component.scss'
})
export class SurveyViewComponent {

}
