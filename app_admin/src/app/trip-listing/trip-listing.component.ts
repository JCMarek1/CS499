import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TripCardComponent } from "../trip-card/trip-card.component";

import { TripDataService } from "../services/trip-data.service";
import { Trip } from "../models/trip";

import { Router } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";

@Component({
    selector: 'app-trip-listing',
    standalone: true,
    imports: [CommonModule, TripCardComponent],
    templateUrl: './trip-listing.component.html',
    styleUrl: './trip-listing.component.css', 
    providers: [TripDataService]
})

export class TripListingComponent implements OnInit {

    trips!: Trip[]
    message: string = '';

    constructor(
        private tripDataService: TripDataService,
        private router: Router,
        private authenricationService: AuthenticationService
    ) {
        console.log('trip-listing constructor');
    }

    ngOnInit(): void {
        this.tripDataService.getTrips()
            .subscribe({
                next: (trips: Trip[]) => this.trips = trips,
                error: (error) => console.error('Error loading trips:', error)
            });
    }

    public isLoggedIn(): boolean{
        return this.authenricationService.isLoggedIn();
    }

    public addTrip(): void {
        this.router.navigate(['/add-trip']); 
    }
}