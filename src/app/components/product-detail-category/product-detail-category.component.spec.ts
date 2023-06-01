import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailCategoryComponent } from './product-detail-category.component';

describe('ProductDetailCategoryComponent', () => {
  let component: ProductDetailCategoryComponent;
  let fixture: ComponentFixture<ProductDetailCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
