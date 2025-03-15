import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { JoinSurveyComponent } from './components/join-survey/join-survey.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ViewResultsComponent } from './components/view-results/view-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HomePageComponent, SurveyListComponent, CreateSurveyComponent, JoinSurveyComponent, ViewResultsComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }