import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSurveyComponent } from './join-survey.component';

describe('JoinSurveyComponent', () => {
  let component: JoinSurveyComponent;
  let fixture: ComponentFixture<JoinSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
