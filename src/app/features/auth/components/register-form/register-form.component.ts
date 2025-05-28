import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  @Output() success = new EventEmitter<void>();
  errorMessage = '';

  form!:FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { 
    this.form = this.fb.group({
      pseudo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    const { pseudo, firstName, lastName, password } = this.form.getRawValue();

    this.authService.register({ pseudo, firstName, lastName, password }).subscribe({
      next: () => this.success.emit(),
      error:(err:HttpErrorResponse) => {
        this.errorMessage = err.error?.message ?? "Erreur lors de l'inscription.";
      }
    });
  }
}
