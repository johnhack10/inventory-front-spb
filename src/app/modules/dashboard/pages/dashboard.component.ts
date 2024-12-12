import { Component } from '@angular/core';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardRoutingModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
