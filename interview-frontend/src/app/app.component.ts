import { Component } from '@angular/core';
import { CitiesService } from './cities.service';

interface City {
  uuid: string;
  cityName: string;
  count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  cities: City[];
  searchResults: City[];
  city: string;
  
  constructor(
    private citiesService: CitiesService,
  ) {
    this.cities = [];
    this.searchResults = [];
    this.city = '';
  }
  title = 'city-ui';

  ngOnInit() {
    this.citiesService.getCities().subscribe((data) => {
      console.log(data);
      this.cities = data as City[];
    });
  }

  onSearch() {
    // no input = no result
    if (this.city.trim() === '') {
      this.searchResults = [];
      return;
    }

    // filter cities with the input
    this.searchResults = this.cities.filter((city) =>
    city.cityName.toLowerCase().includes(this.city.toLowerCase())
    );

    // max 5 results
    this.searchResults = this.searchResults.slice(0, 5);
  } 
}