import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  storage: Storage = sessionStorage;
  errorMsg: string | null = null;

  constructor(private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login: this.formBuilder.group({
        email: [''],
        pwd: ['']
      })
    })
  }

  get email() { return this.loginFormGroup.get('login.email') };
  get pwd() { return this.loginFormGroup.get('login.pwd') };

  onSubmit() {
    if (this.email?.value === "ashok.kumar@gmail.com") {
        this.storage.setItem('customerEmail', this.email?.value);
        this.router.navigateByUrl("/orders");
    }else{
        this.errorMsg = "Invalid Credentials";
    }
  }

}
