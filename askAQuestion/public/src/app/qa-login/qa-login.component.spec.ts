import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaLoginComponent } from './qa-login.component';

describe('QaLoginComponent', () => {
  let component: QaLoginComponent;
  let fixture: ComponentFixture<QaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
