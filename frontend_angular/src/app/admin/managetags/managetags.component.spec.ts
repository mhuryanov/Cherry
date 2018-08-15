import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetagsComponent } from './managetags.component';

describe('ManagetagsComponent', () => {
  let component: ManagetagsComponent;
  let fixture: ComponentFixture<ManagetagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
