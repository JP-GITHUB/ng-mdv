import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxHomeComponent } from './parallax-home.component';

describe('ParallaxHomeComponent', () => {
  let component: ParallaxHomeComponent;
  let fixture: ComponentFixture<ParallaxHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
