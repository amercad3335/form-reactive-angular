import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//! Podria ser info back
const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: '5'
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent  implements OnInit {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
    // TODO: cargar info de un back por ejemplo
    //! this.myForm.reset( rtx5090 );
  }

  isNotValidField( field: string ): boolean | null {

    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;

  }

  getFieldError( field: string ): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo es requerido`;

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;

  }


  onSeve(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 0, inStorage: 0 });
  }

}
