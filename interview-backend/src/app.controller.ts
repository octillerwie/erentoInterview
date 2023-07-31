import { Controller, Get, HttpException, HttpStatus, } from '@nestjs/common';
import { AppService } from './app.service';
import { Cities } from './app.service';

@Controller('api/cities')

export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getCities(): Cities[] {
    try {
      return this.appService.getCities();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}