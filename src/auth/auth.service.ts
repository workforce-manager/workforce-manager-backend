import * as bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { AUTH_ERRORS } from "./constants";
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "./dto/register.dto";
import { PrismaService } from "src/prisma.service";
import { JwtPayload } from "./interfaces/jwt.interface";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      throw new ConflictException(AUTH_ERRORS.EMAIL_ALREADY_EXISTS);
    }

    const hash = await bcrypt.hash(dto.password, 10);

    return await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        role: Role.EMPLOYEE,
      },
    });
  }

  private generateTokens(userId: string) {
    const payload: JwtPayload = { userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow<string>("JWT_ACCESS_TOKEN_TTL")
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow<string>("JWT_REFRESH_TOKEN_TTL")
    });

    return { accessToken, refreshToken };
  }
}
