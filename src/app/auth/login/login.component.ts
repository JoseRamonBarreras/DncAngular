import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import Swal from 'sweetalert2';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  logo!: string;
  catDog!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AuthState>
  ) { }

  ngOnInit(): void {
     this.logo = "./img/avanzarh.png";
     this.catDog = "./img/imagelogin.jpg";
    if (localStorage.getItem('token') != null) {
      this.redirect();
    }
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm).subscribe(
      (response) => {
        console.log('Login FromBackend', response);
        this.setLocalStorage(response);

        this.store.dispatch(AuthActions.signIn());
        this.store.dispatch(AuthActions.setToken(response.access_token));
        this.store.dispatch(AuthActions.signUpSuccess(response));

        this.store.select('authState').pipe(take(1)).subscribe((authState) => {
          console.log('Auth Token', authState);
          if (authState.authToken) {
            this.redirect();  
          }
        });

      }, (error) => {
        this.error = error.error.message;
        this.loading = false;
        this.showMessage();
      });
  }

  private setLocalStorage(response: any) {
    localStorage.clear();
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('user_id', response.user.id);
    localStorage.setItem('user_name', response.user.name);
    localStorage.setItem('roles', response.role);
    localStorage.setItem('permisos', JSON.stringify(response.permissions));
    localStorage.setItem('profile', JSON.stringify(response.profile));
    localStorage.setItem('cliente_id', response.cliente.id)
  }

  private showMessage(): void {
    Swal.fire({
      title: 'ERROR INICIO DE SESIÓN',
      text: 'Correo y/o contraseña incorrectos!',
      icon: 'warning',
      allowOutsideClick: false,
    });
  }

  private redirect() { 
    console.log('redirecttttt');
    if(localStorage.getItem('roles') == 'SISTEMAS'){
      this.router.navigate(['/admin/usuarios']); 
    } else{
      this.router.navigate(['/admin/ajustes']); 
    }
    
  }

}
