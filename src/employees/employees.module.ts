import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { EmployeesService } from "./employees.service";
import { EmployeesController } from "./employees.controller";

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, PrismaService],
})
export class EmployeesModule {}
