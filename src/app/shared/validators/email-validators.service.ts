import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { delay, Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class EmailValidators implements AsyncValidator {

  public validate( control: AbstractControl ): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log({ email });

    return new Observable<ValidationErrors | null>( subcriber => {

        if (email === 'amercad@test.com') {
          subcriber.next({ emailTaken: true });
          subcriber.complete();
        }

        subcriber.next(null);
        subcriber.complete();

    }).pipe(
        delay( 5000 )
    );


  }

  // validate( control: AbstractControl ): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email });

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay( 2000 )
  //   );

  // }

  // return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
  //   .pipe(
  //     map(resp => {
  //       return ( resp.length === 0 )
  //         ? null
  //         : { emailTaken: true }
  //     })
  //   );

}
