import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(1)]],
    category: ['', [Validators.required, Validators.minLength(1)]],
    price: ['', [Validators.required, Validators.minLength(1)]],
    image: ['', [Validators.required, Validators.minLength(1)]],
  })

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;
      }
    }

    return null;
  }

  constructor(private service: ProductService, private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  email!: string;

  ngOnInit(): void {
    this.authService.getUserToken().subscribe(resp => {
      this.email = resp.email;
    })
  }

  create() {
    const body: Product = {
      name: this.myForm.controls['name'].value,
      description: this.myForm.controls['description'].value,
      category: this.myForm.controls['category'].value,
      price: parseFloat(this.myForm.controls['price'].value),
      email_Usuario: this.email,
      image: this.myForm.controls['image'].value,
    };
    console.log(body);

    this.service.create(body)
      .subscribe(res => console.log(res))
    this.router.navigateByUrl('/products');
  }


}
