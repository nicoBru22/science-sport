import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAjouterArticle } from './form-ajouter-article';

describe('FormAjouterArticle', () => {
  let component: FormAjouterArticle;
  let fixture: ComponentFixture<FormAjouterArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAjouterArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAjouterArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
