import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdetailComponent } from './listdetail.component';

describe('ListdetailComponent', () => {
  let component: ListdetailComponent;
  let fixture: ComponentFixture<ListdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
