import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products.interface';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private endpoint: string = 'http://localhost:3000/products';
  private limit: number = 6;
  private offset: number = 0;

  getProducts(): Observable<Product[]> {
    const queryParams = new HttpParams().set('limit', this.limit).set('offset', this.offset);
    return this.http.get<Product[]>(this.endpoint, {params: queryParams});
  }

  getProductById(id:number): Observable<Product>{
    return this.http.get<Product>(`${this.endpoint}/${id}`);
  }

  getProductsByName(name:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.endpoint}/name/${name}`);
  }

  getProductsByCategory(category:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.endpoint}/category/${category}`);
  }

  eliminarProducto(id:number){
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  update(id: number, body: Product){
    return this.http.patch<Product>(`${this.endpoint}/${id}`, body);
  }

  create(body: Product){
    return this.http.post<Product>(this.endpoint, body)
  }

  aumentarOffset(){
    this.offset+=6;
  }

  disminuirOffset(){
    if (this.offset>0) {
      this.offset-=6;
    }
  }

}
