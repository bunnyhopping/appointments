import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  signupForm: FormGroup
  title = 'app';

  constructor(

    private _builder: FormBuilder

  ) {
    this.signupForm = this._builder.group({
      name:[''],
      user:['',Validators.required],
      email:['',Validators.compose([Validators.email, Validators.required])],
      password:['',Validators.required]
    })
  }

  enviar(values:any){
    console.log(values);
  }
}
