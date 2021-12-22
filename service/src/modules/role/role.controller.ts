import { Body, Controller, Delete, Param, Patch, Post, Put, Query } from "@nestjs/common"
import { RoleService } from "./role.service"
import { PutRoleDto } from "./dtos/put-role.dto"
import { GetRoleDto } from "./dtos/get-role.dto"
import { UpdateRoleDto } from "./dtos/update-role.dto"

@Controller("role")
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post("role")
    async getRoles(@Body() getRoleDto: GetRoleDto) {
        return await this.roleService.findAllSysRoles(getRoleDto)
    }

    @Put("role")
    async addRole(@Body() putRoleDto: PutRoleDto) {
        return await this.roleService.putSysRole(putRoleDto)
    }

    @Patch("role")
    async updateRole(@Body() updateRoleDto: UpdateRoleDto) {
        return await this.roleService.updateRole(updateRoleDto)
    }

    @Delete("role/:id")
    async deleteRole(@Param("id") id: string) {
        return await this.roleService.deleteRoleById(id)
    }
}
