import { IsNotEmpty, IsNumber } from "class-validator"

export class UpdateUserDto {
    @IsNotEmpty({ message: "用户id不能为空" })
    @IsNumber({})
    readonly id: number
    readonly userName: string

    readonly nikeName: string

    readonly roleId: string

    readonly roleIds: string[]

    readonly userAvatar: string
}
