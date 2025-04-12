import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Corrected import
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {

  @Input() trip!: Trip; // Strongly type with Trip interface

  constructor(private router: Router) {}

  ngOnInit(): void { }

  public editTrip(trip: Trip) {
    // Use Angular router navigation with parameters instead of localStorage
    this.router.navigate(['/edit-trip', trip.code]);
  }
}