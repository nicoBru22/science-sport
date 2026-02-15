import { Component, inject } from '@angular/core'; // Ajoute inject ici
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { USER_RULES } from '../../model/userModel';
import { UserService } from '../../service/userService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly USER_RULES = USER_RULES;
  loginForm: FormGroup;
  errorMessage: string = '';

  // On injecte le service ici
  readonly #userService = inject(UserService);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required, 
        Validators.minLength(USER_RULES.MIN_USERNAME),
        Validators.pattern(USER_RULES.USERNAME_PATTERN)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(USER_RULES.MIN_PASSWORD),
        Validators.pattern(USER_RULES.PASSWORD_PATTERN)
      ]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log('Tentative de connexion avec :', credentials);
      
      // C'EST ICI QUE ÇA SE PASSE :
      // On appelle la méthode login du service et on "s'abonne" au résultat
      this.#userService.login(credentials).subscribe({
        next: (response) => {
          console.log('Réponse du serveur (Succès) :', response);
          // Ici tu pourras rediriger vers /articles
        },
        error: (err) => {
          console.error('Erreur réseau ou auth :', err);
          this.errorMessage = "Identifiants incorrects ou serveur injoignable.";
        }
      });

    } else {
      this.errorMessage = "Le formulaire contient des erreurs de validation.";
    }
  }
}