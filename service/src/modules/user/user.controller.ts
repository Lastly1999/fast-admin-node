import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UserService } from "./user.service"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"
import { JwtTokenParams } from "../auth/jwt.strategy"

@UseGuards(AuthGuard("jwt"))
@Controller("user")
@ApiTags("系统用户")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("user")
    @ApiOperation({ summary: "创建系统用户" })
    @ApiBody({ type: CreateUserDto })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto)
    }

    @Patch("user")
    @ApiOperation({ summary: "修改系统用户信息" })
    @ApiBody({ type: UpdateUserDto })
    async updateUserInfo(@Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(updateUserDto)
    }

    @Get("role")
    @ApiOperation({ summary: "查询用户角色列表" })
    async getUserRoles(@Req() request: Request) {
        return await this.userService.getUserRoles((request.user as JwtTokenParams).roleId)
    }

    @Get("menu")
    @ApiOperation({ summary: "获取用户系统菜单" })
    async getSysRoleMenus(@Req() request: Request) {
        return await this.userService.getUserRoleMenus((request.user as JwtTokenParams).roleId)
    }
}
