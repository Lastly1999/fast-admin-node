import { LoginForm } from "@/services/model/response/role";

export type AutCodeOptions = {
    cap: string;
    captchaId: string;
}


export type EmitOptions = {
    (event: "change", form: LoginForm): void;
}