import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeDeleteComponent } from './branch-office-delete.component';

describe('BranchOfficeDeleteComponent', () => {
  let component: BranchOfficeDeleteComponent;
  let fixture: ComponentFixture<BranchOfficeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOfficeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
