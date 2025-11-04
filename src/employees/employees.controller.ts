import { Employee } from "@prisma/client";
import { EmployeesService } from "./employees.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }
}
