import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewssliderComponent } from './newsslider.component';

describe('NewssliderComponent', () => {
  let component: NewssliderComponent;
  let fixture: ComponentFixture<NewssliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewssliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewssliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
