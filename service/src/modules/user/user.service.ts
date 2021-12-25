import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UserRepository } from "./user.repository"
import { UpdateUserDto } from "./dtos/update-user.dto"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    /**
     * 查找用户
     * @param userName
     * @param passWord
     */
    async findUser(userName: string, passWord: string) {
        try {
            const result = await this.userRepository.findOne({ where: { userName, passWord } })
            if (!result) throw new HttpException("暂未注册用户", HttpStatus.INTERNAL_SERVER_ERROR)
            return result
        } catch (e) {
            throw new HttpException("发生未知错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 创建用户
     * @param createUserDto
     */
    async createUser(createUserDto: CreateUserDto) {
        await this.userRepository.createUserInsertRoleIds(createUserDto).catch(() => {
            throw new HttpException("创建失败", HttpStatus.INTERNAL_SERVER_ERROR)
        })
        return "创建成功"
    }

    /**
     * 更新用户信息
     * @param updateUserDto
     */
    async updateUser(updateUserDto: UpdateUserDto) {
        const user = new User()
        user.id = updateUserDto.id
        user.userName = updateUserDto.userName
        user.nikeName = updateUserDto.nikeName
        await this.userRepository.update(user, updateUserDto)
    }

    /**
     * 获取用户角色的ids列表
     * @param id
     */
    async getUserRoles(id: string) {
        try {
            const rolesRes = await this.userRepository.findUserRoles(Number(id))
            return rolesRes.roles.map((item) => item.roleId)
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 查询用户所有的权限菜单
     * @param userId
     */
    async getUserRoleMenus(userId: string) {
        try {
            return await this.userRepository.findUserRoleMenus(Number(userId))
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
