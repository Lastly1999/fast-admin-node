import { Body, Controller, Delete, Param, Patch, Post, Put } from "@nestjs/common"
import { RoleService } from "./role.service"
import { PutRoleDto } from "./dtos/put-role.dto"
import { GetRoleDto } from "./dtos/get-role.dto"
import { UpdateRoleDto } from "./dtos/update-role.dto"
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger"

@Controller("role")
@ApiTags("系统角色")
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post("role")
    @ApiOperation({ summary: "获取系统角色" })
    @ApiBody({ type: GetRoleDto })
    async getRoles(@Body() getRoleDto: GetRoleDto) {
        return await this.roleService.findAllSysRoles(getRoleDto)
    }

    @Put("role")
    @ApiOperation({ summary: "添加角色" })
    @ApiBody({ type: PutRoleDto })
    async addRole(@Body() putRoleDto: PutRoleDto) {
        return await this.roleService.putSysRole(putRoleDto)
    }

    @Patch("role")
    @ApiOperation({ summary: "修改系统角色信息" })
    @ApiBody({ type: UpdateRoleDto })
    async updateRole(@Body() updateRoleDto: UpdateRoleDto) {
        return await this.roleService.updateRole(updateRoleDto)
    }

    @Delete("role/:id")
    @ApiOperation({ summary: "删除系统角色" })
    @ApiQuery({ name: "id", required: true })
    async deleteRole(@Param("id") id: string) {
        return await this.roleService.deleteRoleById(id)
    }
}
