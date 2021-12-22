import { Injectable } from "@nestjs/common"
import { GetRoleDto } from "../role/dtos/get-role.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { SystemRepository } from "./system.repository"

@Injectable()
export class SystemService {
    constructor(@InjectRepository(SystemRepository) private readonly systemRepository: SystemRepository) {}

    /***
     * 查询系统图标集
     * @param getIconsDto
     */
    async getIcons(getIconsDto: GetRoleDto) {
        return this.systemRepository.getIcons(getIconsDto.pageSize, getIconsDto.pageNo, getIconsDto.keywords)
    }
}
