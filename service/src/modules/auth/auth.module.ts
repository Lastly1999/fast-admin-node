import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../user/user.entity"
import { ToolsService } from "../../common/tools/tools.service"
import { UserModule } from "../user/user.module"
import { UserService } from "../user/user.service"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { JwtStrategy } from "./jwt.strategy"
import { AuthController } from "./auth.controller"
import { jwtConstants } from "./constants"
import {BaseMenuModule} from "../base-menu/base-menu.module"
import {BaseMenuService} from "../base-menu/base-menu.service"
import {BaseMenu} from "../base-menu/base-menu.entity"

@Module({
    controllers: [AuthController],
    providers: [AuthService, ToolsService, UserService,BaseMenuService, JwtStrategy],
    exports: [JwtModule],
    imports: [
        BaseMenuModule,
        UserModule,
        TypeOrmModule.forFeature([User,BaseMenu]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        }),
    ],
})
export class AuthModule {}
