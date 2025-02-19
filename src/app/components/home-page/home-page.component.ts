import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CREATE_SURVEY_ROUTE, JOIN_SURVEY_ROUTE, LIVE_RESULTS_ROUTE, SURVEY_LIST_ROUTE } from '../../constants/routes.const';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private router: Router) {}

  navToCreate(): void {
    this.router.navigate([CREATE_SURVEY_ROUTE]);
  }

  navToJoin(): void {
    this.router.navigate([JOIN_SURVEY_ROUTE]);
  }

  navToList(): void {
    this.router.navigate([SURVEY_LIST_ROUTE]);
  }

  navToResults(): void {
    this.router.navigate([LIVE_RESULTS_ROUTE]);
  }

}
