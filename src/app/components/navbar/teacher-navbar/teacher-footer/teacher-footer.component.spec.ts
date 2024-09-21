import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFooterComponent } from './teacher-footer.component';

describe('TeacherFooterComponent', () => {
  let component: TeacherFooterComponent;
  let fixture: ComponentFixture<TeacherFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
