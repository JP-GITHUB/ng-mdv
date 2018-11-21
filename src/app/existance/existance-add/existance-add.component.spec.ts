import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistanceAddComponent } from './existance-add.component';

describe('ExistanceAddComponent', () => {
  let component: ExistanceAddComponent;
  let fixture: ComponentFixture<ExistanceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistanceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
