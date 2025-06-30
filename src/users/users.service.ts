import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  findAll(): string[] {
    return ["Max", "Ivan", "Vlad"];
  }
}
