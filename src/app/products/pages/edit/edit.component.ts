import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/products.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(1) ] ],
    description: ['', [ Validators.required, Validators.minLength(1) ] ],
    category: ['', [ Validators.required, Validators.minLength(1) ] ],
    price: ['', [ Validators.required, Validators.minLength(1) ] ],
    image: ['', [ Validators.required, Validators.minLength(1) ] ],
  })

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }

  constructor(private service:ProductService, private activeRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private authService: AuthService){}

  product!: Product;
  products!: Product[];
  email!: string;

  ngOnInit(): void {
    this.service.getProducts().subscribe(response => {
      this.products = response;
    })
    this.activeRoute.params.subscribe(({id}) => {
      this.service.getProductById(id).subscribe(response => this.product = response)
    })
    this.authService.getUserToken().subscribe(resp => {
      this.email = resp.email;
      console.log(this.email);
      
    })
  }

  update(id: number){
    const body: Product = {
      name: this.myForm.controls['name'].value,
      description: this.myForm.controls['description'].value,
      category: this.myForm.controls['category'].value,
      price: parseFloat(this.myForm.controls['price'].value),
      email_Usuario: this.email,
      image: this.myForm.controls['image'].value,
    };
    console.log(body);
    
    this.service.update(id, body)
      .subscribe(res => {
        console.log(res);
      });
      this.router.navigateByUrl('/products/');
  }

}
