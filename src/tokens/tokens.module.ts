import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokensService } from "./tokens.service";
import { jwtConfig } from "src/config/jwt.config";

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
