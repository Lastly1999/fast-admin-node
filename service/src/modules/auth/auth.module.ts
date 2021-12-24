import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../user/user.entity"
import { ToolsService } from "../tools/tools.service"
import { UserModule } from "../user/user.module"
import { UserService } from "../user/user.service"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { JwtStrategy } from "./jwt.strategy"
import { AuthController } from "./auth.controller"
import { ConfigModule, ConfigService } from "@nestjs/config"

@Module({
    controllers: [AuthController],
    providers: [AuthService, ToolsService, UserService, JwtStrategy],
    exports: [JwtModule],
    imports: [
        UserModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: "local" }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get<string>("JWT_SECRET"),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AuthModule {}
