import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.images';
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
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit() {
      // Lấy productId từ URL      
      // const idParam = this.activatedRoute.snapshot.paramMap.get('id');
      debugger
      //this.cartService.clearCart();
      const idParam = 1 //fake tạm 1 giá trị
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
    
    thumbnailClick(index: number) {
      debugger
      // Gọi khi một thumbnail được bấm
      this.currentImageIndex = index; // Cập nhật currentImageIndex
    }  
    // getTotalPrice(): number {
    //   if (this.product) {
    //     return this.product.price * this.quantity;
    //   }
    //   return 0;
    // }
}
