import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from "@nestjs/common";
import { Employee } from "@prisma/client";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(dto);
  }
}
