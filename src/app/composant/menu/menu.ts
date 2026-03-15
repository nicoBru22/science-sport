import { Component, inject, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../service/userService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'], 
})
export class Menu implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  isLoggedIn$ = this.userService.loggedIn$;

  navbarHidden = false;
  private lastScrollTop = 0;

  ngOnInit() {
    // Forcer le rafraîchissement Angular pour l'état login
    this.userService.loggedIn$.subscribe(() => this.cdr.detectChanges());
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.error("Erreur logout", err)
    });
  }

  // Scroll listener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > this.lastScrollTop && st > 50) {
      // Scroll down
      this.navbarHidden = true;
    } else {
      // Scroll up
      this.navbarHidden = false;
    }

    this.lastScrollTop = st <= 0 ? 0 : st;
    this.cdr.detectChanges(); // Met à jour Angular
  }
}