import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagestatusComponent } from './managestatus.component';

describe('ManagestatusComponent', () => {
  let component: ManagestatusComponent;
  let fixture: ComponentFixture<ManagestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
