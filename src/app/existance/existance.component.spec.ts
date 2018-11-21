import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistanceComponent } from './existance.component';

describe('ExistanceComponent', () => {
  let component: ExistanceComponent;
  let fixture: ComponentFixture<ExistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
