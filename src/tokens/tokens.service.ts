import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "./interfaces/jwt.interface";

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  generateTokens(userId: string) {
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
