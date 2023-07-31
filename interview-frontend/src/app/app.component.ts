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
  city: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private citiesService: CitiesService,
  ) {
    this.cities = [];
    this.city = '';
  }
  title = 'city-ui';
  ngOnInit() {
    this.citiesService.getCities().subscribe((data) => {
      console.log(data);
      this.cities = data as City[];
    });
  }
}