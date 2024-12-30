import { Routes } from '@angular/router';
import { SurveyViewComponent } from './components/survey-view/survey-view.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { JoinSurveyComponent } from './components/join-survey/join-survey.component';
import { CREATE_SURVEY_ROUTE, HOME_ROUTE, JOIN_SURVEY_ROUTE, SURVEY_ROUTE } from './constants/routes';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';

export const routes: Routes = [
    { path: '', redirectTo: HOME_ROUTE, pathMatch: 'full' },
    { path: SURVEY_ROUTE, component: SurveyViewComponent },
    { path: HOME_ROUTE, component: HomePageComponent },
    { path: JOIN_SURVEY_ROUTE, component: JoinSurveyComponent },
    { path: CREATE_SURVEY_ROUTE, component: CreateSurveyComponent },
    { path: '**', redirectTo: HOME_ROUTE }
];
