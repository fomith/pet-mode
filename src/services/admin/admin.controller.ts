import { Controller, UseFilters, HttpException, HttpStatus, Get } from '@nestjs/common'
import { AdminService } from './admin.service'
import { HttpExceptionFilter } from './http-exception.filter'

@Controller('pet')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async deleteService() {
    throw new HttpException('good', HttpStatus.OK)
  }
}
