import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() success = new EventEmitter<void>();
  errorMessage = '';
  form;
  

  constructor(private fb: FormBuilder, private authService: AuthService) { 
    this.form = this.fb.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.authService.login(this.form.getRawValue() as { pseudo: string; password: string }).subscribe({
      next: () => {
        this.success.emit();
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Erreur inconnue lors de la connexion.';
      }
    });
  }
}
