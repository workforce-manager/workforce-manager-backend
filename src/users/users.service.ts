import { Role, User } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        role: Role.EMPLOYEE,
      },
    });
  }
}
