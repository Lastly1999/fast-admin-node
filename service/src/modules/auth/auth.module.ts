import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../user/user.entity"
import { ToolsService } from "../tools/tools.service"
import { UserModule } from "../user/user.module"
import { PassportModule } from "@nestjs/passport"
import { jwtConstants } from "./constants"
import { JwtModule } from "@nestjs/jwt"

@Module({
    controllers: [AuthController],
    providers: [AuthService, ToolsService],
    imports: [
        TypeOrmModule.forFeature([User]),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "60s" },
        }),
    ],
})
export class AuthModule {}
