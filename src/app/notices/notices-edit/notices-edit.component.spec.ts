import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesEditComponent } from './notices-edit.component';

describe('NoticesEditComponent', () => {
  let component: NoticesEditComponent;
  let fixture: ComponentFixture<NoticesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
