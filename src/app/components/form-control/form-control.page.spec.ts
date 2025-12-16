import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlPage } from './form-control.page';

describe('FormControlPage', () => {
  let component: FormControlPage;
  let fixture: ComponentFixture<FormControlPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
