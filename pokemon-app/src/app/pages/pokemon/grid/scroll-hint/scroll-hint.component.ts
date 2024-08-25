import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-scroll-hint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-hint.component.html',
  styleUrl: './scroll-hint.component.scss'
})
export class ScrollHintComponent {
  showHelper = input.required<boolean>()

}
