import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  public person = {
    gender: 'F',
    wantNotifications: true
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  isNotValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  // getFieldError(field: string): string | null {

  //   if (!this.myForm.controls[field]) return null;

  //   const errors = this.myForm.controls[field].errors || {};

  //   for (const key of Object.keys([errors])) {

  //     switch( key ) {
  //       case 'requiredTrue': return `Debe de aceptar las condiciones de uso`;
  //     }

  //   }

  //   return null;

  // }



  onSave(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.myForm.value;

    this.person = newPerson;

    console.log(this.myForm);
    console.log(this.person);

  }

}
