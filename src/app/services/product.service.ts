import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products";

  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient:HttpClient) { }


  getProduct(theProductId: number): Observable<Product>{
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProducts(): Observable<Product[]>{
    return this.httpClient
               .get<GetResponse>(this.baseUrl)
               .pipe(map(response => response._embedded.products));
  
  }

  searchProducts(theKeyWord: string): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
    return this.httpClient
               .get<GetResponse>(searchUrl)
               .pipe(map(response => response._embedded.products));
  }

  getProductsByCategory(theCategoryId: number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient
               .get<GetResponse>(searchUrl)
               .pipe(map(response => response._embedded.products));
  
  }

  getProductCategories(): Observable<ProductCategory[]>{
      return this.httpClient
                 .get<GetResponseProductCategories>(this.categoryUrl)
                 .pipe(map(response => response._embedded.productCategory));
  }

}

interface GetResponse{
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategories{
  _embedded: {
    productCategory: ProductCategory[];
  }
}