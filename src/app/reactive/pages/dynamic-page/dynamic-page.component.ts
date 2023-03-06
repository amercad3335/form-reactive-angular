import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html'
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);


  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  constructor( private fb: FormBuilder ) {}

  onDeleteFavorite( index: number ): void {

    this.favoriteGames.removeAt( index );

  }

  onAddFavorites(): void {


    if (this.newFavorite.invalid) {
      this.newFavorite.markAllAsTouched();
      return;
    };

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();

  }

  isNotValid(field: string): boolean | null {

    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;

  }

  isNotValidNewControl(control: FormControl): boolean | null {

    return control.errors && control.touched;

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

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
        && formArray.controls[index].touched;
  }

  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();

  }

}
