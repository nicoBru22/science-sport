import { Component } from '@angular/core';

@Component({
  selector: 'app-sport-handicap',
  imports: [],
  templateUrl: './sport-handicap.html',
  styleUrl: './sport-handicap.scss',
})
export class SportHandicap {
  opened: string | null = null;

  // On ajoute des flags pour forcer les animations
  animateLogo = false;
  animateText = false;

  logos = [
    {
      id: 'cpsf',
      name: 'CPSF',
      img: 'images/cpsf-logo.png',
      text: 'Le Comité Paralympique et Sportif Français représente le mouvement paralympique.',
      link: 'https://www.cpsf.fr'
    },
    {
      id: 'handisport',
      name: 'Handisport',
      img: 'images/handisport.jpg',
      text: 'La Fédération Française Handisport permet la pratique sportive aux personnes en situation de handicap moteur et sensoriel.',
      link: 'https://www.handisport.org'
    },
    {
      id: 'sportadapte',
      name: 'Sport Adapté',
      img: 'images/sport-adapte.jpg',
      text: 'La Fédération Française du Sport Adapté permet a pratique sportive aux personnes en situation de handicap mental, psychique ou ayant des troubles du neur développement.',
      link: 'https://www.sportadapte.fr'
    }
  ];

  toggle(id: string) {
    if (this.opened === id) {
      this.opened = null;
      return;
    }

    this.opened = id;

    this.animateLogo = false;
    this.animateText = false;

    setTimeout(() => {
      this.animateLogo = true;
      this.animateText = true;
    }, 10);
  }

  getLogo(id: string) {
    return this.logos.find(l => l.id === id)!;
  }
}
