import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAxes } from './section-axes';

describe('SectionAxes', () => {
  let component: SectionAxes;
  let fixture: ComponentFixture<SectionAxes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionAxes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionAxes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
