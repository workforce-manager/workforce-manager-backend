import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
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

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow<string>("JWT_ACCESS_TOKEN_TTL")
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow<string>("JWT_REFRESH_TOKEN_TTL")
    });

    return { accessToken, refreshToken };
  }
}
