import { PropType } from "vue"
import { AutCodeOptions } from "./typings"

export default {
    formLoading: {
        type: Boolean,
        default: false
    },
    authCode: {
        type: Object as PropType<AutCodeOptions>,
        default: { cap: "", captchaId: "" }
    }
}