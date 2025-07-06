import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { PrismaService } from "src/prisma.service";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      throw new ConflictException("Email is already in use");
    }

    const hash = await bcrypt.hash(dto.password, 10);

    return await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        role: "EMPLOYEE",
      },
    });
  }
}
