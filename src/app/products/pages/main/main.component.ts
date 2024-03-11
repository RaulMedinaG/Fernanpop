import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/products.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { UserLogged } from '../../../auth/interfaces/userlogged.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  nombreBusqueda:string = '';

  products: Product[] = [];
  categorys: string[] = [];
  userLogged!: UserLogged;

  constructor(private service:ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.Products();
    this.userLogged = this.authService.getUser;
  }

  Products(){
    this.service.getProducts().subscribe(response => {
      this.products = response;

      this.products.map((product) => {
        if (this.categorys.includes(product.category) || product.category == '') {
          return;
        } else{
          this.categorys.push(product.category);
        }
      })

    });
  }

  buscarProductos() {
    
    if (this.nombreBusqueda == '') {
      this.Products();
    } else{
      this.service.getProductsByName(this.nombreBusqueda).subscribe(response => {    
      
        this.products = response;
        console.log(this.products);
      
      })
      
    }
    
  }

  aumentarOffset(){
    this.service.aumentarOffset();
    this.Products();
  }

  disminuirOffset(){
    this.service.disminuirOffset();
    this.Products();
  }

}
