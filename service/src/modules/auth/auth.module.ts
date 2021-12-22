import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../user/user.entity"
import { ToolsService } from "../tools/tools.service"

@Module({
    controllers: [AuthController],
    providers: [AuthService, ToolsService],
    imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
