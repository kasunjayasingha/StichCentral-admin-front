import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderDetailsComponent } from './add-order-details.component';

describe('AddOrderDetailsComponent', () => {
  let component: AddOrderDetailsComponent;
  let fixture: ComponentFixture<AddOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(AddOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
