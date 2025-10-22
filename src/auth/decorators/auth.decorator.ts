import { JwtGuard } from "../guards/auth.guard";
import { applyDecorators, UseGuards } from "@nestjs/common";

export function Auth() {
  return applyDecorators(UseGuards(JwtGuard));
}
