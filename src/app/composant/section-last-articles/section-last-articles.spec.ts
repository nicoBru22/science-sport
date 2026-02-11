import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLastArticles } from './section-last-articles';

describe('SectionLastArticles', () => {
  let component: SectionLastArticles;
  let fixture: ComponentFixture<SectionLastArticles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionLastArticles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionLastArticles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
