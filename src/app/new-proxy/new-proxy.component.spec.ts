import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProxyComponent } from './new-proxy.component';

describe('NewProxyComponent', () => {
  let component: NewProxyComponent;
  let fixture: ComponentFixture<NewProxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProxyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
