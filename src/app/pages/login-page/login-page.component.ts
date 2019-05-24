import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  checkbox_icheck: HTMLElement = document.getElementById('checkbox_icheck');

  // @Input() user = {
  //   email: '',
  //   password: ''
  // }

  private LoginUser: FormGroup;

  constructor(public router: Router, public auth: AuthService, private formBuilder: FormBuilder) {
    this.LoginUser = this.formBuilder.group(
      {
        email: ["", Validators.required],
        password: ["", Validators.required]
      }
    );
  }

  ngOnInit() {
    this.body.classList.add('hold-transition');
    this.body.classList.add('login-page');
  }

  ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('hold-transition');
    this.body.classList.remove('login-page');
  }

  loggingIn() {
    this.auth.login(this.LoginUser.value).subscribe((data) => {
      if(data.status == 200) {
        this.router.navigate(['/admin/dashboard']);
        alert('Anda berhasil Login.');
      } else if(data.status == 401) {
        alert('Password Anda atau email salah.');
      }
    },
    err => {
      console.log('err', err);
      if (err.status == 401)
          alert("Email dan Password salah!");
    })
  }
}
