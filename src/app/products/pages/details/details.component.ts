import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/products.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  constructor(private service:ProductService, private activeRoute: ActivatedRoute, private router: Router, private authService: AuthService, private http: HttpClient){}

  product!: Product;
  email!: string;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({id}) => {
      this.service.getProductById(id).subscribe(response => this.product = response)
    })
    this.authService.getUserToken().subscribe(resp => {
      this.email = resp.email;
      console.log(this.email);
      
    })
  }

  eliminar(id: number){
    
    Swal.fire({
      title: "¿Quieres eliminar este producto?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Producto eliminado!", "", "success");
        this.service.eliminarProducto(id).subscribe(()=>{
          this.router.navigateByUrl('/products')
        });
      } else if (result.isDenied) {
        Swal.fire("Producto no eliminado", "", "info");
      }
    });
  }

}