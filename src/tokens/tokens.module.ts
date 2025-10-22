import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokensService } from "./tokens.service";
import { jwtConfig } from "src/config/jwt.config";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [TokensService, PrismaService],
  exports: [TokensService],
})
export class TokensModule {}
