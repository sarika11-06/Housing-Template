import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="error-component">
        <div class="img-section">
          <img src="/assets/404.jpg" alt="pagenotfound" />
        </div>
        <a class="error-back" [routerLink]="['/']">
          <h2>Go back</h2>
        </a>
    </div>
  `,
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {}
