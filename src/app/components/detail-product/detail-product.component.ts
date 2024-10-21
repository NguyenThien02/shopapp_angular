import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.images';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit{
  productId: number = 0;
  product?: Product;
  currentImageIndex: number = 0;
  quantity: number = 1;
  isPressedAddToCart:boolean = false;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
  ){}

  ngOnInit() {
      // Lấy productId từ URL      
      // const idParam = this.activatedRoute.snapshot.paramMap.get('id');
      debugger
      // this.cartService.clearCart();
      const idParam = 4 //fake tạm 1 giá trị
      if (idParam !== null) {
        this.productId = +idParam;
      }
      if (!isNaN(this.productId)) {
        this.productService.getDetailProduct(this.productId).subscribe({
          next: (response: any) => {              
            debugger
            this.product = response;
            if (this.product && this.product.thumbnail) {
              this.product.url = `${environment.apiBaseUrl}/products/images/${this.product.thumbnail}`;
            }
          },
          complete: () => {
            debugger;
          },
          error: (error: HttpErrorResponse) => {
            debugger;
            console.error(error?.error?.message ?? '');
          }
        });    
      } else {
        console.error('Invalid productId:', idParam);
      }      
    }

    increaseQuantity(): void {
      debugger
      this.quantity++;
    }
    
    decreaseQuantity(): void {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
    addToCart(): void {
      debugger
      this.isPressedAddToCart = true;
      if (this.product) {
        this.cartService.addToCart(this.product.id, this.quantity);
      } else {
        // Xử lý khi product là null
        console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
      }
    }    
    buyNow(): void {      
      if(this.isPressedAddToCart == false) {
        this.addToCart();
      }
    }   
}
