import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/app/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    products: Product[] = [];
    currentPage: number = 0;
    itemsPerPage: number = 10;
    pages: number[] = [];
    totalPages: number = 0;
    visiblePages: number[] = [];

    constructor(
      private productService: ProductService,
    ){}

    ngOnInit(){
      this.getProducts(this.currentPage, this.itemsPerPage);
    }

    getProducts(page: number, limit: number){
      this.productService.getProducts(page,limit).subscribe({
        next: (response: any) => {
          debugger
          response.products.forEach((product: Product) => {          
            product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          });
          this.products = response.products;
          // Phân trang generateVisiblePageArray
          this.totalPages = response.totalPages;
          this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching products:', error);
        }
      });
    }
    // Phân trang 
    generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
      const maxVisiblePages = 5;
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  
      let startPage = Math.max(currentPage - halfVisiblePages, 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
  
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
  
      return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
    }

    onPageChange(page: number) {
      debugger;
      this.currentPage = page;
      this.getProducts(this.currentPage, this.itemsPerPage);
    }
}
