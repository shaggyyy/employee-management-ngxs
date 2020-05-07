import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterGridComponent } from './login-register-grid.component';

describe('LoginRegisterGridComponent', () => {
  let component: LoginRegisterGridComponent;
  let fixture: ComponentFixture<LoginRegisterGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegisterGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
