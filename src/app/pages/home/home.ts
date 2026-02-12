import { Component } from '@angular/core';
import { SectionHero } from "../../composant/section-hero/section-hero";
import { SectionAxes } from "../../composant/section-axes/section-axes";
import { SectionAPropos } from "../../composant/section-apropos/section-apropos";
import { SectionLastArticles } from "../../composant/section-last-articles/section-last-articles";
import { Parallax } from "../../composant/parallax/parallax";

@Component({
  selector: 'app-home',
  imports: [SectionHero, SectionAxes, SectionAPropos, SectionLastArticles, Parallax],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
