import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRecievedComponent } from './request-recieved.component';

describe('RequestRecievedComponent', () => {
  let component: RequestRecievedComponent;
  let fixture: ComponentFixture<RequestRecievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestRecievedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
