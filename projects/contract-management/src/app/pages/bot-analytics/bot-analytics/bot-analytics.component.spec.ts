import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotAnalyticsComponent } from './bot-analytics.component';

describe('BotAnalyticsComponent', () => {
  let component: BotAnalyticsComponent;
  let fixture: ComponentFixture<BotAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
