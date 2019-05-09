import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxHocusComponent } from './ngrx-hocus.component';

describe('NgrxHocusComponent', () => {
  let component: NgrxHocusComponent;
  let fixture: ComponentFixture<NgrxHocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxHocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxHocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
