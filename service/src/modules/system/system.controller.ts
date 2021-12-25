import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { SystemService } from "./system.service"
import { PutIconDto } from "./dtos/put-icon.dto"
import { GetRoleDto } from "../role/dtos/get-role.dto"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"

@UseGuards(AuthGuard("jwt"))
@Controller("sys")
@ApiTags("系统工具")
export class SystemController {
    constructor(private readonly systemService: SystemService) {}

    @Post("icon")
    async addIcon(@Body() putIconDto: PutIconDto) {
        return null
    }

    @Post("icon")
    @ApiOperation({ summary: "获取系统图标" })
    async getIcons(@Body() getIconDto: GetRoleDto) {
        return this.systemService.getIcons(getIconDto)
    }
}
