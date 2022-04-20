import { IsNotEmpty } from "class-validator"

export class FindUserDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    readonly userName: string

    @IsNotEmpty({ message: "密码不能为空" })
    readonly passWord: string

    @IsNotEmpty({ message: "验证码id不能为空" })
    readonly code: string

    @IsNotEmpty({ message: "验证码不能为空" })
    readonly codeAuth: string
}
