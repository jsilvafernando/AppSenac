import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesListComponent } from './notices-list.component';

describe('NoticesListComponent', () => {
  let component: NoticesListComponent;
  let fixture: ComponentFixture<NoticesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
