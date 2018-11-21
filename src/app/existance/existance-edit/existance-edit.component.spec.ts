import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistanceEditComponent } from './existance-edit.component';

describe('ExistanceEditComponent', () => {
  let component: ExistanceEditComponent;
  let fixture: ComponentFixture<ExistanceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistanceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
