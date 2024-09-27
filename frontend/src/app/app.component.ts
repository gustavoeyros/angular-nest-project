import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GrowerComponent } from './components/grower-card/grower.component';
import { Grower, GrowerApiResponse } from './entities/grower';
import { environment } from '../environment/environment';
import { GrowerFormComponent } from './components/grower-form/grower-form.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GrowerComponent, GrowerFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  componentTitle = 'TerraForma Produtor';
  growersResponse: Grower[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchGrowers();
  }
  fetchGrowers() {
    this.http
      .get<GrowerApiResponse>(`${environment.apiUrl}/growers`)
      .subscribe({
        next: (response) => {
          this.growersResponse = response.data;
        },
        error: (error) => {
          console.error('Error fetching growers', error);
        },
      });
  }

  get growers() {
    return this.growersResponse;
  }
}
