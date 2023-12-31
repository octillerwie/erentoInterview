import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { CitiesService } from './cities.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

interface City {
  uuid: string;
  cityName: string;
  count: number;
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let citiesService: CitiesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [CitiesService],
      schemas: [NO_ERRORS_SCHEMA],
    });

    citiesService = TestBed.inject(CitiesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance; 
  });

  it('should be created', () => {
    expect(citiesService).toBeTruthy();
  });

  it('should return an array of cities with a length of 100', fakeAsync(() => {
    let cities: City[] | undefined;
    citiesService.getCities().subscribe((data) => {
      cities = data as City[];
      expect(cities?.length).toEqual(100);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/cities'
    );
    expect(req.request.method).toBe('GET');

    const dummyCities: City[] = Array.from({ length: 100 }, (_, index) => ({
      uuid: `${index}`,
      cityName: `City ${index}`,
      count: index,
    }));
    req.flush(dummyCities);

    tick();
    httpTestingController.verify();

  }));

  it('should fetch cities from the API', () => {
    const dummyCities = [
      {
        uuid: '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f',
        cityName: 'Berlin',
        count: 523,
      },
      {
        uuid: '4a7f5c2d-3a10-4a02-a9b3-450839929e43',
        cityName: 'Hamburg',
        count: 267,
      },
    ];

    citiesService.getCities().subscribe((cities) => {
      expect(cities).toEqual(dummyCities);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/cities'
    );
    expect(req.request.method).toBe('GET');

    req.flush(dummyCities);
    httpTestingController.verify();
  });

  it('should display matching cities with a maximum of 5 results', fakeAsync(() => {
    spyOn(citiesService, 'getCities').and.returnValue(
      of([
        { uuid: '1', cityName: 'City A', count: 100 },
        { uuid: '2', cityName: 'City B', count: 100 },
        { uuid: '3', cityName: 'City C', count: 100 },
        { uuid: '4', cityName: 'City D', count: 100 },
        { uuid: '5', cityName: 'City E', count: 100 },
        { uuid: '6', cityName: 'City F', count: 100 },
      ])
    );

    component.ngOnInit();
    tick();

    // console.log('Cities:', component.cities);

    component.city = 'City';
    component.onSearch();
    fixture.detectChanges();
    tick();

    // console.log('Search Results:', component.searchResults);

    expect(component.searchResults.length).toEqual(5);  
  }));

  it('should update the input field value and search for matching cities', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('.search-input'); // Adjust the selector to target the input field correctly

    const inputValue = 'Berlin'; 
    component.city = inputValue; 

    fixture.detectChanges(); 

    // console.log('Component City:', component.city); 
    // console.log('Input Element Value:', inputElement.value);

    component.onSearch(); 

    fixture.detectChanges();

    expect(component.city).toEqual(inputValue);
  });

});
