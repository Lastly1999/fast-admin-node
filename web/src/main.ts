import { createApp } from "vue"
import App from "./App.vue"

// antd
import Antd from 'ant-design-vue'
// import "./theme/fast-theme.less"

// vuex
import store from '@/store'
// animate
import animate from "animate.css"
// moment
import moment from "moment"
// pinia
import { createPinia } from 'pinia'

import "font-awesome/css/font-awesome.min.css"
import { processChromeConole } from "./runtime.console"

// symbols
import { MOM_ENT } from "@/symbol/global"

import QueryGroup from "@/components/QueryGroup/QueryGroup.vue"

// 路由实例
import router from "@/router"

function installGlobalComponents(app: any) {
    app.component('QueryGroup', QueryGroup)
}

function bootstrap() {
    const pinia = createPinia()
    const app = createApp(App)
    app.provide(MOM_ENT, moment)
    installGlobalComponents(app)
    app.use(router)
    app.use(Antd)
    app.use(store)
    app.use(animate)
    app.use(pinia)
    app.mount("#app")
    processChromeConole()
}

bootstrap()
