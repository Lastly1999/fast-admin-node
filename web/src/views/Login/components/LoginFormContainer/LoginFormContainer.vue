<script lang="ts" setup>
import { ref } from 'vue'
import type { LoginForm } from "@/services/model/response/role"
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

// props typings
import LoginFormProps from "./props"

//components
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'


defineProps(LoginFormProps)

const formRef = ref()

const emit = defineEmits<{
    (event: "change", form: LoginForm): void
}>()

const loginForm = ref<LoginForm>({
    userName: "",
    passWord: "",
    captchaId: "",
    captchaCode: ""
})

const rules = {
    userName: [
        { required: true, message: 'Please input UserName', trigger: 'blur' },
    ],
    passWord: [
        { required: true, message: 'Please input PassWord', trigger: 'blur' },
    ],
    captchaCode: [
        { required: true, message: 'Please input codeAuth', trigger: 'blur' },
    ]
};

const onSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            emit("change", loginForm.value);
        })
        .catch((error: ValidateErrorEntity<LoginForm>) => {
            console.log('error', error);
        });

}
</script>


<template>
    <div class="login-form-container">
        <h2 class="form-title">您好！欢迎登录</h2>
        <a-form ref="formRef" :rules="rules" :model="loginForm">
            <a-form-item name="userName">
                <a-input size="large" v-model:value="loginForm.userName" placeholder="userName">
                    <template #prefix>
                        <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="passWord">
                <a-input
                    size="large"
                    v-model:value="loginForm.passWord"
                    type="password"
                    placeholder="Password"
                >
                    <template #prefix>
                        <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="code">
                <a-row>
                    <a-col :span="17">
                        <a-input
                            size="large"
                            v-model:value="loginForm.captchaCode"
                            placeholder="authCode"
                        >
                            <template #prefix>
                                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </a-input>
                    </a-col>
                    <a-col :span="7">
                        <div v-html="authCode.cap"></div>
                        <!-- <img style="width:100%" :src="authCode.codeBase"/> -->
                    </a-col>
                </a-row>
            </a-form-item>
            <a-form-item>
                <a-button
                    block
                    type="primary"
                    html-type="submit"
                    size="large"
                    :loading="formLoading"
                    @click="onSubmit"
                >Log in</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
