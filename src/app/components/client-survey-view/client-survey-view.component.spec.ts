import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSurveyViewComponent } from './client-survey-view.component';

describe('ClientSurveyViewComponent', () => {
  let component: ClientSurveyViewComponent;
  let fixture: ComponentFixture<ClientSurveyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSurveyViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSurveyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
