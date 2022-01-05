import { defineStore } from "pinia"

import { getAllSysMenus } from "@/services/auth"
import { getSystemIcons } from "@/services/system/sys"
import { getRoles } from "@/services/role"

const useSysCommonStore = defineStore({
    id: "sysCommon",
    state: () => ({
        iconSelectDataSource: [],
        systemMenus: [],
        systemRoles: []
    }),
    getters: {
        getSysIcons: state => state.iconSelectDataSource,
        getSysMenus: state => state.systemMenus,
        getSysRoles: state => state.systemRoles
    },
    actions: {
        async apiGetSysIcons() {
            const { data, code } = await getSystemIcons()
            if (code === 200) this.iconSelectDataSource.length === 0 && (this.iconSelectDataSource = data)
        },
        async apiGetSysMenus() {
            const { data, code } = await getAllSysMenus()
            if (code === 200) this.systemMenus.length === 0 && (this.systemMenus = data)
        },
        async apiGetSysRoles() {
            const { data, code } = await getRoles()
            if (code === 200) this.systemRoles = data
        }
    }
})

export default useSysCommonStore