import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

export interface Cities {
  uuid: string;
  cityName: string;
  count: number;
}
@Injectable()
export class AppService {
  private cities: Array<Cities>;

  constructor() {
    const filePath = path.resolve(__dirname, '..', '..', 'cities.json');
    this.cities = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  getCities(): Cities[] {
    return this.cities;
  }
}