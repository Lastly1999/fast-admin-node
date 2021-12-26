import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { BaseMenu } from "./base-menu.entity"
import { Repository } from "typeorm"

@Injectable()
export class BaseMenuService {
    constructor(
        @InjectRepository(BaseMenu)
        private readonly baseMenuRepository: Repository<BaseMenu>
    ) {}
    /**
     * 查询用户所有的权限菜单
     * @param userId
     */
    async getUserRoleMenus(userId: string) {
        try {
            return this.baseMenuRepository
                .createQueryBuilder("menu")
                .innerJoinAndSelect("sys_basemenu_roles", "sbr", "menu.id = sbr.menu_id")
                .andWhere("sbr.role_id = :roleId", { roleId: userId })
                .getMany()
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
