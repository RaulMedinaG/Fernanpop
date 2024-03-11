import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(4) ] ],
    email: ['', [ Validators.required, Validators.email ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ] ],
  })

  constructor(private service: AuthService, private router: Router,  private fb: FormBuilder){

  }

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
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`;
      }
    }

    return null;
  }

  register(){
    this.service.register(this.myForm.controls['name'].value,this.myForm.controls['email'].value, this.myForm.controls['password'].value).subscribe((resp => {
      if(resp) this.router.navigate(['products/']);
    }));
  }

}
