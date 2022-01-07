import { RoleItem } from "@/store/modules/system"

export type LoginForm = {
    userName: string;
    passWord: string;
    captchaCode: string;
    captchaId: string;
}

export type UserInfo = {
    id: number;
    nikeName: string;
    role: RoleItem[];
    roleId: string;
    userAvatar: string;
    userName: string;
}

export interface RoleForm {
    roleId: number | null;
    roleName: string;
    describe: string;
    createDate: string;
    state?: number;
}

export interface RolePermissionParam {
    roleId: number | null;
    permissionId: number[];
}

export type MenuInfo = {
    name?: string;
    icon?: string | null;
    path?: string;
    parentId?: number;
    pName?: string;
}

export type ApiLogsParams = {
    timer: string[];
    pageNo: number;
    pageSize: number;
}