import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidators } from 'src/app/shared/validators/email-validators.service';
import { cantBeStrider, emailPattern, firstNameAndLastnamePattern } from 'src/app/shared/validators/validators';

// import * as customValidators from 'src/app/shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(firstNameAndLastnamePattern)]],
    //? Usar cuando se usa muy pocas veces
    //! email: ['', [Validators.required, Validators.pattern(emailPattern)], [new EmailValidators()]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)], [this.emailValidators]],
    username: ['', [Validators.required, cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {

    validators: [

      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')

    ]

  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidators: EmailValidators
  ) {}

  isNotValidField( field: string ): boolean | null {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  onSave(): void {
    this.myForm.markAllAsTouched();
  }

}
