import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProductComponent } from './page2.component';

describe('Page2Component', () => {
  let component: StockProductComponent;
  let fixture: ComponentFixture<StockProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockProductComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
