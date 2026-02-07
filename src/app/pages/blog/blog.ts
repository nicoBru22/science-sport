import { Component } from '@angular/core';
import { Carte } from '../../composant/carte/carte';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [Carte, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {

}
