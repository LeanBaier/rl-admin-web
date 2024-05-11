import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesViewComponent } from './exercises-view.component';

describe('ExercisesViewComponent', () => {
  let component: ExercisesViewComponent;
  let fixture: ComponentFixture<ExercisesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercisesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
