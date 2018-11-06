import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeEditComponent } from './branch-office-edit.component';

describe('BranchOfficeEditComponent', () => {
  let component: BranchOfficeEditComponent;
  let fixture: ComponentFixture<BranchOfficeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOfficeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
