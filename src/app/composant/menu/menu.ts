import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../service/userService'; // Utilise l'interface !
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'], 
})
export class Menu implements OnInit {
  // 1. Injecter l'interface pour garantir le Singleton
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  // 2. On garde l'observable pour le pipe async, 
  // MAIS on ajoute un abonnement manuel pour forcer la détection
  isLoggedIn$ = this.userService.loggedIn$;

  ngOnInit() {
    console.log("[Menu] Initialisation et écoute du statut...");
    
    // 3. Cette souscription force Angular à réagir
    this.userService.loggedIn$.subscribe(status => {
      console.log("[Menu] Changement d'état détecté :", status);
      // Force le rafraîchissement des composants "Standalone"
      this.cdr.detectChanges(); 
    });

    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.userService.getMe().subscribe({
      next: (user) => console.log("[Menu] Session active :", user.username),
      error: () => console.log("[Menu] Pas de session (401)")
    });
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.error("Erreur logout", err)
    });
  }
}