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

    /**
     * 获取系统菜单
     */
    async findSysMenus() {
        try {
            return this.baseMenuRepository.find()
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 查询系统菜单详情
     * @param menuId
     */
    async findOneMenuInfo(menuId: string) {
        try {
            return this.baseMenuRepository.findOne(menuId)
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 查询关联权限菜单的所有ids
     * @param roleId
     */
    async getMenuIdsByRoleId(roleId: string) {
        try {
            const dataIds = await this.baseMenuRepository
                .createQueryBuilder("menu")
                .leftJoinAndSelect("sys_basemenu_roles", "sbr", "menu.id =" + " sbr.menu_id")
                .andWhere("sbr.role_id = :roleId", { roleId })
                .select("menu.id")
                .getMany()
            return dataIds.map((item) => item.id)
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
