import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <div class="content">
        <h2 class="listing-heading">{{ housingLocation.name }}</h2>
        <p class="listing-location">
          {{ housingLocation.city }}, {{ housingLocation.state }}
        </p>
        <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
      </div>
    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
  // !-it defines that the value of property will not be null or undefined
  @Input() housingLocation!: HousingLocation;
}
