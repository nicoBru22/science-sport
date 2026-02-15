import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserServerService } from '../../service/utilisateurServerService';
import { User } from '../../model/userModel';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-creer-compte',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './creer-compte.html',
  styleUrl: './creer-compte.scss',
})
export class CreerCompte {
  private fb = inject(FormBuilder);
  private userService = inject(UserServerService);
  private router = inject(Router);

  errorMessage: string = '';

  // Définition du formulaire réactif
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required]]
  });

  onRegister() {
    if (this.registerForm.valid) {
      // IL FAUT ENVOYER 'mdp' POUR QUE LE BACK LE RECOIVE
      const userToRegister = {
        username: this.registerForm.value.username!,
        mdp: this.registerForm.value.password! // <-- On change 'password' en 'mdp'
      };

      console.log("Données envoyées (Payload) :", userToRegister);

      this.userService.register(userToRegister as any).subscribe({
        next: (response) => {
          console.log('Réussite !');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = "Erreur lors de l'inscription";
        }
      });
    }
  }
}

