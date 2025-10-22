import { 
  Injectable, 
  UnauthorizedException, 
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AUTH_ERRORS } from "src/auth/constants";
import { PrismaService } from "src/prisma.service";
import { JwtPayload } from "./interfaces/jwt.interface";

@Injectable()
export class TokensService {
  constructor(
    private readonly prisma: PrismaService,
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

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
      });

      if (!user) {
        throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
      }

      return this.generateTokens(payload.userId);
    } catch {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_REFRESH_TOKEN);
    }
  }
}
