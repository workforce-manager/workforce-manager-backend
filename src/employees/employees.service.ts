import { Employee } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Employee[]> {
    return await this.prisma.employee.findMany();
  }

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const { name, email, phone } = dto;
    return await this.prisma.employee.create({
      data: {
        name,
        email,
        phone,
      },
    });
  }
}
