import { Component } from '@angular/core';
import { ProductService } from '../../../products/services/product.service';
import { Product } from '../../../products/interfaces/products.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logo: string = '../../../assets/logo.png';
  products: Product[] = [];
  categorys: string[] = [];
  
  constructor(private service:ProductService, private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.Products();
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

    })    
  }

  logOut() {
    this.router.navigate(['auth/']);
    this.authService.logOut();
  }

}
