import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAPropos } from './section-apropos';

describe('SectionAPropos', () => {
  let component: SectionAPropos;
  let fixture: ComponentFixture<SectionAPropos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionAPropos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionAPropos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
