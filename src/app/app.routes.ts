import { Routes } from '@angular/router';
import { SurveyViewComponent } from './components/survey-view/survey-view.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { JoinSurveyComponent } from './components/join-survey/join-survey.component';
import { CLIENT_SURVEY_ROUTE, CREATE_SURVEY_ROUTE, EDIT_SURVEY_ROUTE, HOME_ROUTE, JOIN_SURVEY_ROUTE, LIVE_RESULTS_ROUTE, SURVEY_LIST_ROUTE, SURVEY_ROUTE } from './constants/routes.const';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { ClientSurveyViewComponent } from './components/client-survey-view/client-survey-view.component';
import { ViewResultsComponent } from './components/view-results/view-results.component';
import { EditSurveyComponent } from './components/edit-survey/edit-survey.component';

export const routes: Routes = [
    { path: '', redirectTo: HOME_ROUTE, pathMatch: 'full' },
    { path: SURVEY_ROUTE, component: SurveyViewComponent },
    { path: HOME_ROUTE, component: HomePageComponent },
    { path: JOIN_SURVEY_ROUTE, component: JoinSurveyComponent },
    { path: CREATE_SURVEY_ROUTE, component: CreateSurveyComponent },
    { path: SURVEY_LIST_ROUTE, component: SurveyListComponent },
    { path: CLIENT_SURVEY_ROUTE, component: ClientSurveyViewComponent },
    { path: LIVE_RESULTS_ROUTE + '/:surveyId', component: ViewResultsComponent },
    { path: EDIT_SURVEY_ROUTE + '/:surveyId', component: EditSurveyComponent },
    { path: '**', redirectTo: HOME_ROUTE }
];
