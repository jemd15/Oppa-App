import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  public createAccountForm: FormGroup
  public passConfirmationWrong = null

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createAccountForm = this.createCreateAccountForm()
  }

  createAccount() {
    console.log(this.createAccountForm.value);
  }

  createCreateAccountForm() {
    return this.formBuilder.group({
      fullname: ['', Validators.required],
      birthdate: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      checkPassword: ['', Validators.required],
      grandparents: this.formBuilder.array([])
    })
  }

  get grandparents(): FormArray {
    return this.createAccountForm.get('grandparents') as FormArray
  }

  addGrandparent() {
    const grandparent = this.formBuilder.group({
      fullname : ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required]
    })

    this.grandparents.push(grandparent)

  }

  removeGrandparent(index: number) {
    this.grandparents.removeAt(index)
  }

  // confirm new password validator
  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors({ mismatch: false });
      this.passConfirmationWrong = false;
    } else {
      this.confirm_password.setErrors({ mismatch: true });
      this.passConfirmationWrong = true;
    }
  }
  
  // getting the form control elements
  get password(): AbstractControl {
    return this.createAccountForm.controls['password'];
  }
  
  get confirm_password(): AbstractControl {
    return this.createAccountForm.controls['checkPassword'];
  }

}
