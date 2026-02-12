import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-parallax',
  standalone: true,
  imports: [],
  templateUrl: './parallax.html',
  styleUrl: './parallax.scss',
})
export class Parallax {
  @Input({ required: true }) image!: string;
  @Input() height: string = '500px';
}
