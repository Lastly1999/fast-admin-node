import { defineStore } from "pinia"

import router from "@/router"
import { checkAuthUser, getSysMenus, getSystemUserInfo } from "@/services/auth"
import { LoginForm } from "@/services/model/response/role"
import { generateRouteWhiteList, listToTree } from "@/utils/loadsh/data"


const USER_INFO_CACHE_KEY = "user-info"
const TOKEN_CACHE_KEY = "auth-token"


const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        sysMenus: undefined as undefined | any[],
        roleWhiteRoles: [] as string[],
        userInfo: {
            id: 0,
            nikeName: '',
            role: [],
            roleId: '',
            userAvatar: '',
            userName: '',
        }
    }),
    getters: {
        getSysMenus: (state) => state.sysMenus,
        getUserInfo: (state) => state.userInfo,
        getWhiteList: (state) => state.roleWhiteRoles
    },
    actions: {
        async authLogin(payload: LoginForm) {
            const { code, data } = await checkAuthUser<LoginForm>(payload)
            if (code === 200) {
                localStorage.setItem(TOKEN_CACHE_KEY, data.accessToken)
                await router.push('/dashboard')
            } else {
                throw new Error(data)
            }
        },
        async reLogin() {
            localStorage.removeItem(TOKEN_CACHE_KEY)
            localStorage.removeItem(USER_INFO_CACHE_KEY)
            this.sysMenus = undefined
        },
        async getSystemMenus() {
            const { code, data } = await getSysMenus()
            if (code === 200) {
                this.sysMenus = listToTree(data)
                this.roleWhiteRoles = generateRouteWhiteList(data)
            }
        },
        async getSystemUserInfo() {
            const { code, data } = await getSystemUserInfo()
            if (code === 200) localStorage.setItem(USER_INFO_CACHE_KEY, JSON.stringify(data))
        }
    }
})

export default useAuthStore