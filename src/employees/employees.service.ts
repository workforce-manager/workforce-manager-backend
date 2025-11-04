import { Employee } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Employee[]> {
    return await this.prisma.employee.findMany();
  }
}
