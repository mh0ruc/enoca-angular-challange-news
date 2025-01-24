import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsdetailComponent } from './newsdetail.component';

describe('NewsdetailComponent', () => {
  let component: NewsdetailComponent;
  let fixture: ComponentFixture<NewsdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
