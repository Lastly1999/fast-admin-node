import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { Request } from "express"
import { BaseMenuService } from "./base-menu.service"
import { JwtTokenParams } from "../auth/jwt.strategy"
import { AuthGuard } from "@nestjs/passport"

@UseGuards(AuthGuard("jwt"))
@Controller("menu")
export class BaseMenuController {
    constructor(private readonly baseMenuService: BaseMenuService) {}

    @Get("role")
    @ApiOperation({ summary: "获取用户系统菜单" })
    async getSysRoleMenus(@Req() request: Request) {
        return await this.baseMenuService.getUserRoleMenus((request.user as JwtTokenParams).roleId)
    }

    @Get("menu")
    @ApiOperation({ summary: "获取系统菜单" })
    async getAllMenus() {
        return await this.baseMenuService.findSysMenus()
    }

    @Get("menu/:menuId")
    @ApiOperation({summary:"获取系统菜单详情"})
    async getMenuInfo(@Param("menuId") menuId: string) {
        return await this.baseMenuService.findOneMenuInfo(menuId)
    }

    @Get("ids/:roleId")
    @ApiOperation({summary:"获取系统菜单的id列表"})
    async getMenuRoleIds(@Param("roleId") roleId: string) {
        return await this.baseMenuService.getMenuIdsByRoleId(roleId)
    }
}
