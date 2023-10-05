import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  hide = true;
  constructor(
    private _fb: FormBuilder,
    private _AuthService: AuthService,
    private _router: Router,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email(): any {
    return this.loginForm.get('email');
  }
  get password(): any {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('userToken', res.token);
          this._AuthService.userData();
          this._router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.warning(err.error.msg, 'error');
        },
      });
    }
  }
}
