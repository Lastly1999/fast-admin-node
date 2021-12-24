import { Body, Controller, Patch, Post } from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UserService } from "./user.service"
import { Transaction } from "typeorm"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger"

@Controller("user")
@ApiTags("系统用户")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("user")
    @ApiOperation({ summary: '创建系统用户' })
    @ApiBody({ type: CreateUserDto })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto)
    }

    @Patch("user")
    @ApiOperation({ summary: '修改系统用户信息' })
    @ApiBody({ type: UpdateUserDto })
    async updateUserInfo(@Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(updateUserDto)
    }
}
