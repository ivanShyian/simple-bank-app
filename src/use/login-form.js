import {useField, useForm} from "vee-validate";
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import * as yup from 'yup'

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string()
            .trim()
            .required('Введите email')
            .email('Необходимо ввести корректный email')
    )
    const PASSWORD_LENGTH = 6
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string()
            .trim()
            .required('Введите пароль')
            .min(PASSWORD_LENGTH, `Пароль не может быть меньше ${PASSWORD_LENGTH} символов`)
    )

    const isTooManyAttempts = computed(() => submitCount.value >= 3)
    watch(isTooManyAttempts, (val) => {
        if (val) {
            setTimeout(() => {
                submitCount.value = 0
            }, 15000)
        }
    })
    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values)
            await router.push('/')
        } catch (e) {}

    })

    return {
        onSubmit, isSubmitting, isTooManyAttempts,
        email, password,
        eError, pError,
        eBlur, pBlur
    }

}
