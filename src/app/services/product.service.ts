import { Inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiGetProducts = `${environment.apiBaseUrl}/products`;

    constructor(private http: HttpClient) { }

    getProducts(keyword: string, categoryId: number,
        page: number, limit: number
    ): Observable<Product[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('category_id', categoryId)
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiGetProducts, { params });
    }
    getDetailProduct(productId: number) {
        return this.http.get(`${this.apiGetProducts}/${productId}`);
    }
    getProductsByIds(productIds: number[]): Observable<Product[]>{
        debugger
        const params = new HttpParams().set('ids', productIds.join(',')); 
        return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, { params });
    }
}