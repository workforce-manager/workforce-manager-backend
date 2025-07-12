import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { AuthController } from "./auth.controller";
import { TokensModule } from "src/tokens/tokens.module";

@Module({
  imports: [TokensModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
