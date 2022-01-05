import { defineStore } from "pinia"

const CACHE_KEY_THEME = "sys-theme"

export type SystemTheme = 'dark' | "light"

const useSysConfigStore = defineStore({
    id: "sysConfig",
    state: () => ({
        systemTheme: "" as SystemTheme
    }),
    getters: {
        getSystemTheme: (state) => state.systemTheme
    },
    actions: {
        async setSystemTheme(theme: SystemTheme) {
            localStorage.setItem(CACHE_KEY_THEME, theme)
            this.systemTheme = theme
        }
    }
})

export default useSysConfigStore