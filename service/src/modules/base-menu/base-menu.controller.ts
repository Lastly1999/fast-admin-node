import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { Request } from "express"
import { BaseMenuService } from "./base-menu.service"
import { JwtTokenParams } from "../auth/jwt.strategy"
import { AuthGuard } from "@nestjs/passport"

@UseGuards(AuthGuard("jwt"))
@Controller("menu")
export class BaseMenuController {
    constructor(private readonly baseMenuService: BaseMenuService) {}

    @Get("menu")
    @ApiOperation({ summary: "获取用户系统菜单" })
    async getSysRoleMenus(@Req() request: Request) {
        return await this.baseMenuService.getUserRoleMenus((request.user as JwtTokenParams).roleId)
    }
}
