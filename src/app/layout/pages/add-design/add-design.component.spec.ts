import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignComponent } from './add-design.component';

describe('AddDesignComponent', () => {
  let component: AddDesignComponent;
  let fixture: ComponentFixture<AddDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDesignComponent]
    });
    fixture = TestBed.createComponent(AddDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
