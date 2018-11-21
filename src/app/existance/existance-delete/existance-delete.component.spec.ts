import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistanceDeleteComponent } from './existance-delete.component';

describe('ExistanceDeleteComponent', () => {
  let component: ExistanceDeleteComponent;
  let fixture: ComponentFixture<ExistanceDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistanceDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistanceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
