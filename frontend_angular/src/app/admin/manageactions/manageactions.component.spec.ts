import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageactionsComponent } from './manageactions.component';

describe('ManageactionsComponent', () => {
  let component: ManageactionsComponent;
  let fixture: ComponentFixture<ManageactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
