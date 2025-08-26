import { ConfigService } from "@nestjs/config";
import type { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.getOrThrow<string>("JWT_SECRET"),
    signOptions: {
      expiresIn: configService.getOrThrow<string>("JWT_ACCESS_TOKEN_TTL"),
    },
  }),
};
