import { EntityRepository, Repository } from "typeorm"
import { User } from "./user.entity"
import { CreateUserDto } from "./dtos/create-user.dto"
import { Role } from "../role/role.entity"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    /**
     * 创建用户并设置相对应权限
     * @param createUserDto
     */
    async createUserInsertRoleIds(createUserDto: CreateUserDto) {
        const roles: Role[] = []
        createUserDto.roleIds.map(async (item) => {
            const role = new Role()
            role.roleId = Number(item)
            roles.push(role)
        })
        const user = new User()
        user.userName = createUserDto.userName
        user.passWord = createUserDto.passWord
        user.userAvatar = createUserDto.userAvatar
        user.nikeName = createUserDto.nikeName
        user.roleId = createUserDto.roleId
        user.roles = roles
        return await this.manager.save(user)
    }

    /**
     * 查询用户的角色权限列表
     * @param id
     */
    async findUserRoles(id: number) {
        const createdBuilder = await this.manager.getRepository(User).createQueryBuilder("sys_users")
        const allUseBuilder = createdBuilder.innerJoinAndSelect("sys_users.roles", "roles")
        return await allUseBuilder.where("sys_users.id = :id", { id: id }).getOne()
    }
}
