import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HomeComponent } from '../home/home.component';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="details-component">
      <a class="details-back" [routerLink]="['/']">Go back</a>
      <article class="details-article">
        <div class="image-wrapper">
          <img
            class="listing-photo"
            [src]="housingLocation?.photo"
            alt="Exterior photo of {{ housingLocation?.name }}"
          />
        </div>
        <div class="content-wrapper">
          <section class="listing-description">
            <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
            <p class="listing-location">
              {{ housingLocation?.city }}, {{ housingLocation?.state }}
            </p>
          </section>
          <section class="listing-features">
            <h2 class="section-heading">About this housing location</h2>
            <ul>
              <li>Units available: {{ housingLocation?.availableUnits }}</li>
              <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
              <li>
                Does this location have laundry: {{ housingLocation?.laundry }}
              </li>
            </ul>
          </section>
          <section class="listing-apply">
            <h2 class="section-heading">Apply now to live here</h2>
            <form [formGroup]="applyForm" (submit)="submitApplication()">
              <label for="first-name">First Name</label>
              <input id="first-name" type="text" formControlName="firstName" />

              <label for="last-name">Last Name</label>
              <input id="last-name" type="text" formControlName="lastName" />

              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" />
              <button type="submit" class="primary">Apply now</button>
            </form>
          </section>
          <section *ngIf="isFormSubmitted">Thankyou for applying!</section>
        </div>
      </article>
    </div>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  isFormSubmitted = false;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }

  submitApplication() {
    const firstName = this.applyForm.value.firstName ?? '';
    const lastName = this.applyForm.value.lastName ?? '';
    const email = this.applyForm.value.email ?? '';

    this.isFormSubmitted = true;

    this.housingService.submitApplication(firstName, lastName, email);

    this.applyForm.reset();
    setTimeout(() => {
      this.isFormSubmitted = false; // Hide the message after 5 seconds
    }, 5000);
  }
}
