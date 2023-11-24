import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppoinmentComponent } from './view-appoinment.component';

describe('ViewAppoinmentComponent', () => {
  let component: ViewAppoinmentComponent;
  let fixture: ComponentFixture<ViewAppoinmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAppoinmentComponent]
    });
    fixture = TestBed.createComponent(ViewAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
