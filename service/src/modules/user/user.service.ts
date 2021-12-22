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
}
