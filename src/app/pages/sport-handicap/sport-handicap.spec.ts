import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportHandicap } from './sport-handicap';

describe('SportHandicap', () => {
  let component: SportHandicap;
  let fixture: ComponentFixture<SportHandicap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportHandicap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportHandicap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
