import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { jwtConfig } from "src/config/jwt.config";
import { PrismaService } from "src/prisma.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
