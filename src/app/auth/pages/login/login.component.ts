import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public myForm: FormGroup = this.fb.group({
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

  login(){
    this.service.login(this.myForm.controls['email'].value, this.myForm.controls['password'].value).subscribe((resp => {
      console.log(resp);
      if(resp) this.router.navigate(['products/']);        
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Las credenciales son incorrectas!",
        });
      }
    }));
  }

}
