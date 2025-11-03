import { Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async create(dto: CreateEmployeeDto) {
    return await this.prisma.user.create({
      data: {
        ...dto,
        role: Role.EMPLOYEE,
      },
    });
  }
}
