import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetemplatesComponent } from './managetemplates.component';

describe('ManagetemplatesComponent', () => {
  let component: ManagetemplatesComponent;
  let fixture: ComponentFixture<ManagetemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
