import { Body, Controller, Post } from "@nestjs/common"
import { SystemService } from "./system.service"
import { PutIconDto } from "./dtos/put-icon.dto"
import { GetRoleDto } from "../role/dtos/get-role.dto"

@Controller("sys")
export class SystemController {
    constructor(private readonly systemService: SystemService) {}

    @Post("icon")
    async addIcon(@Body() putIconDto: PutIconDto) {
        return null
    }

    @Post("icon")
    async getIcons(@Body() getIconDto: GetRoleDto) {
        return this.systemService.getIcons(getIconDto)
    }
}
