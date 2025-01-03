import { FormsModule } from '@angular/forms';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, CreateSurveyComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ],
  bootstrap: [CreateSurveyComponent]
})
export class AppModule { }