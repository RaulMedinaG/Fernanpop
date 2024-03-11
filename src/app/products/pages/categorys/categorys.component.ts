import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/products.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrl: './categorys.component.css'
})
export class CategorysComponent {

  products: Product[] = [];
  category:string | null = '';

  constructor(private service:ProductService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({category}) => {
      this.service.getProductsByCategory(category).subscribe(response => this.products = response)
    });
    this.obtenerParametro();
  }

  obtenerParametro() {
    this.activeRoute.paramMap.subscribe(params => {
      this.category = params.get('category');
    });
  }

  getProductsByCategory(category: string){
    this.service.getProductsByCategory(category).subscribe(response => {
      this.products = response;
    })
  }

}
