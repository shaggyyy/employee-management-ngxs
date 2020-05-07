import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { registerEmpolyee } from 'src/app/core/actions/core.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(
    private store: Store,
    private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: [""],
      email: [""],
      role: [""],
      department: [""],
      manager_id: [""]
    }) 
  }

  ngOnInit() {
  }

  register() {
    this.store.dispatch(new registerEmpolyee(this.registerForm.value))
  }

}
