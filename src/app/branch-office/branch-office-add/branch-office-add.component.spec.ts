import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeAddComponent } from './branch-office-add.component';

describe('BranchOfficeAddComponent', () => {
  let component: BranchOfficeAddComponent;
  let fixture: ComponentFixture<BranchOfficeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOfficeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
