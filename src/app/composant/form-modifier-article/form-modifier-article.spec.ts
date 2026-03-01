import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModifierArticle } from './form-modifier-article';

describe('FormModifierArticle', () => {
  let component: FormModifierArticle;
  let fixture: ComponentFixture<FormModifierArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModifierArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormModifierArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
