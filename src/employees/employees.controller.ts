import { EmployeesService } from "./employees.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async findAll() {
    return this.employeesService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }
}
