<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { Store, useStore } from "vuex"
import LoginFormContainer from "./components/LoginFormContainer/LoginFormContainer.vue"
import type { LoginForm } from "@/services/model/response/role"

// pinia store
import useAuthStore from "@/stores/useAuthStore"

// apis
import { getImgsAuthCode } from "@/services/auth";
import type { AutCodeOptions } from "./components/LoginFormContainer/typings"

onMounted(() => {
    getAuthImg();
});

const store: Store<any> = useStore();

// 登录button loading
const formLoading = ref<boolean>(false);

const authStore = useAuthStore()

// 登录方法
const loginAction = async (form: LoginForm): Promise<any> => {
    console.log("test")
    formLoading.value = true;
    try {
        await authStore.authLogin({
            ...form,
            captchaId: authCodeParams.value.captchaId,
        })
    } catch {
        await getAuthImg();
    } finally {
        formLoading.value = false;
    }
};

// 图形验证码参数
const authCodeParams = ref<AutCodeOptions>({
    cap: "",
    captchaId: "",
});

// 获取图形验证码
const getAuthImg = async () => {
    const { code, data } = await getImgsAuthCode();
    if (code === 200) authCodeParams.value = { ...data };
};
</script>

<template>
    <div class="login-container">
        <div class="element-container-left">
            <img src="@/assets/login/element1.png" />
        </div>
        <div class="element-container-right">
            <img src="@/assets/login/element2.png" />
        </div>
        <LoginFormContainer
            :formLoading="formLoading"
            :authCode="authCodeParams"
            @change="loginAction"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
