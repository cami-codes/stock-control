import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { UserSignupRequest } from 'src/app/interfaces/user/user-signup-request';
import { AuthRequest } from 'src/app/interfaces/user/auth/auth-request';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public loginCard: boolean = true;
  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  public signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly cookieService: CookieService,
    private readonly messageService: MessageService
  ) {}

  public login(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo de volta, ${response?.name}!`,
              life: 2000,
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer login`,
            life: 2000,
          });
        },
      });
    }
  }

  public signUp(): void {
    if (this.signUpForm.value && this.signUpForm.valid) {
      this.userService
        .userSignUp(this.signUpForm.value as UserSignupRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.signUpForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário criado com sucesso!',
                life: 2000,
              });
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao fazer login`,
              life: 2000,
            });
          },
        });
    }
  }
}
