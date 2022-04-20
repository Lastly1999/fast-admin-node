import {Controller, Post, Get, Patch, Body, Req, UseGuards} from "@nestjs/common"
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { FindUserDto } from "./dtos/find-user.dto"
import {Request} from "express"
import { JwtTokenParams } from "./jwt.strategy"
import {AuthGuard} from "@nestjs/passport";

@Controller("auth")
@ApiTags("系统权限")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    @ApiOperation({ summary: "鉴权登录" })
    @ApiBody({ type: FindUserDto })
    async authLogin(@Body() findUserDto: FindUserDto) {
        return await this.authService.authLogin(findUserDto)
    }

    @Get("/code")
    @ApiOperation({ summary: "获取图片验证码" })
    async authImgCode() {
        return this.authService.generateUserSvgCode()
    }

    @Get("/menu")
    @UseGuards(AuthGuard("jwt"))
    async getSystemAuthMenu(@Req() request:Request) {
        return this.authService.getRoleMenus((request.user as JwtTokenParams).roleId)
    }

    @Get("/menuids")
    async getSystemAuthMenuIds() {
        return "ids"
    }

    @Patch("/menu")
    async updateRoleMenus() {
        return "update"
    }

    @Patch("/user")
    async updateUserRole() {
        return "update"
    }
}
