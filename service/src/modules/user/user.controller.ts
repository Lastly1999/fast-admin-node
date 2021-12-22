import { Body, Controller, Patch, Post } from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UserService } from "./user.service"
import { Transaction } from "typeorm"
import { UpdateUserDto } from "./dtos/update-user.dto"

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("user")
    @Transaction()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto)
    }

    @Patch("user")
    async updateUserInfo(@Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(updateUserDto)
    }
}
