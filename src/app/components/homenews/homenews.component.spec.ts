import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenewsComponent } from './homenews.component';

describe('HomenewsComponent', () => {
  let component: HomenewsComponent;
  let fixture: ComponentFixture<HomenewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomenewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
