import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { AUTH_ERRORS } from "./constants";
import { LoginDto } from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "./dto/register.dto";
import { PrismaService } from "src/prisma.service";
import { JwtPayload } from "./interfaces/jwt.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        role: Role.EMPLOYEE,
      },
    });

    return this.generateTokens(newUser.id);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    return this.generateTokens(user.id);
  }

  private generateTokens(userId: string) {
    const payload: JwtPayload = { userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow<string>("JWT_ACCESS_TOKEN_TTL"),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow<string>("JWT_REFRESH_TOKEN_TTL"),
    });

    return { accessToken, refreshToken };
  }
}
