import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { User } from '../../model/user.model';
import { UserService } from '../../user/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  formUser: FormGroup;

  private emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private messageService: MessageService,
              private route: Router) { 
    this.buildFormUser();
  }

  ngOnInit() {
  }

  private buildFormUser() {
    this.formUser = this.fb.group({
      name: [null, Validators.required],
      email: this.fb.control(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required]
    }, {validator : UserRegisterComponent.equalsTo});
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');
    if(!password || !passwordConfirmation)
      return undefined;

    if(password.value !== passwordConfirmation.value)
      return {passwordsNotMatch: true};
    
    return undefined;
  }

  save() {
    const user: User = new User(this.formUser.value);
    delete user.passwordConfirmation;
    this.userService.save(user)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Salvo com sucesso!' });
        this.route.navigate(['/login']);
      })
  }
}
