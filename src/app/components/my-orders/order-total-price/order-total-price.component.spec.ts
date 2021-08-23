import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTotalPriceComponent } from './order-total-price.component';

describe('OrderTotalPriceComponent', () => {
  let component: OrderTotalPriceComponent;
  let fixture: ComponentFixture<OrderTotalPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTotalPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTotalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
