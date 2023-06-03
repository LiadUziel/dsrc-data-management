import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationRegistrationComponent } from './verification-registration.component';

describe('VerificationRegistrationComponent', () => {
  let component: VerificationRegistrationComponent;
  let fixture: ComponentFixture<VerificationRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
