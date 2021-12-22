import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { User } from "../user/user.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { FindUserDto } from "./dtos/find-user.dto"
import { ToolsService } from "../tools/tools.service"

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly toolsService: ToolsService
    ) {}

    //  验证码redis缓存前缀
    private readonly keyPrefix: string = "mathId"

    /**
     * 查找用户
     * @param findUserDto
     */
    async authLogin(findUserDto: FindUserDto) {
        const verifyResult = await this.toolsService.verifySvgCode(this.keyPrefix, findUserDto.mathId, findUserDto.mathText)
        if (!verifyResult) throw new HttpException("验证码错误，请重试", HttpStatus.INTERNAL_SERVER_ERROR)
        const result = await this.userRepository.findOne({
            where: {
                userName: findUserDto.userName,
                passWord: findUserDto.passWord,
            },
        })
        if (!result) throw new HttpException("暂未注册用户", HttpStatus.INTERNAL_SERVER_ERROR)
        return { info: result }
    }

    /**
     * 生成登录鉴权图形验证码
     * @return Promise<{cap: string, mathId: string}>
     */
    async generateUserSvgCode() {
        const timeOut = 1000 * 60 // 过期时间
        const codeSize = 4 // 图形验证码长度
        return this.toolsService.generateSvgCode(this.keyPrefix, codeSize, timeOut)
    }
}
