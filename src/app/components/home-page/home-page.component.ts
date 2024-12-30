import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CREATE_SURVEY_ROUTE, JOIN_SURVEY_ROUTE } from '../../constants/routes';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private router: Router) {}

  navToCreate(): void {
    this.router.navigate([CREATE_SURVEY_ROUTE], {
      queryParamsHandling: 'preserve'
    });
  }

  navToJoin(): void {
    this.router.navigate([JOIN_SURVEY_ROUTE], {
      queryParamsHandling: 'preserve'
    });
  }

}
