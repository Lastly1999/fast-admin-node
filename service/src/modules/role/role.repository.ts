import { EntityRepository, Like, Repository } from "typeorm"
import { Role } from "./role.entity"

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    /**
     * 查询系统角色列表
     * @param pageSize
     * @param pageNo
     * @param keyWords
     */
    findAllSysRole(pageSize = 10, pageNo = 1, keyWords?: string) {
        return this.manager.getRepository(Role).find({
            skip: pageNo,
            take: pageSize,
            where: { roleName: Like(`%${keyWords}%`) },
        })
    }

    /**
     * 新增系统角色
     * @param role
     */
    async createSysRole(role: Role) {
        const user = await this.manager.getRepository(Role).create(role)
        return this.manager.save(user)
    }

    /**
     * 查询是否存在角色
     * @param id
     */
    async findRoleById(id: number) {
        return this.manager.getRepository(Role).findOne({ where: { roleId: id } })
    }

    /**
     * 更新角色
     * @param id
     * @param role
     */
    async updateRole(role: Role) {
        return await this.manager.getRepository(Role).save(role)
    }

    /**
     * 删除角色
     * @param role
     */
    async deleteRole(role: Role) {
        return this.manager.getRepository(Role).remove(role)
    }
}
