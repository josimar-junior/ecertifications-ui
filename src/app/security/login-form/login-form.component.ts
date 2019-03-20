import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private errorHandler: ErrorHandlerService) { 
    this.buildLoginForm();
  }

  ngOnInit() {
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(email, password).then(() => {
      this.router.navigate(['/admin/listing']);
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

}
