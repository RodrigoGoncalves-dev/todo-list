<template>
    <div class="grid gap-2">
        <h3 class="py-2 mb-4 text-gray-500 text-xl font-medium text-center">
            Esqueci minha senha
        </h3>

        <ResponseMessageComponent
            :message="response.message"
            :color="response.color"
        />

        <ValidationObserver
            ref="forgotPasswordForm"
            tag="form"
            @submit.stop.prevent="forgotPassword"
        >
            <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                name="e-mail"
            >
                <InputComponent
                    v-model="payload.email"
                    input-type="email"
                    placeholder="Digite seu e-mail"
                />
                <ValidateErrorComponent
                    :error-message="errors"
                />
            </ValidationProvider>
            <button
                type="submit"
                class="bg-gray-700 xxxsm:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 flex items-center justify-center hover:bg-gray-800 text-gray-50 font-bold h-11 rounded-sm mt-3"
            >
                <Spinner
                    v-if="spinner.forgot_password"
                    class="animate-spin w-5 h-5 mr-2"
                />
                Resetar senha
            </button>
        </ValidationObserver>

        <RouterLink
            to="/"
            class="text-gray-600 hover:text-gray-300 text-center mt-4 font-light"
        >
            Voltar
        </RouterLink>
    </div>
</template>

<script>
    import Spinner from '@/components/Spinner/Spinner';
    import {ValidationProvider, ValidationObserver} from 'vee-validate';
    import InputComponent from '@/components/Input/InputComponent';
    import message from '@/utils/message';
    import ValidateErrorComponent from '@/components/ValidateErrorComponent';
    import ResponseMessageComponent from '@/components/ResponseMessageComponent';

    export default{
        name: 'ForgotPassword',
        components: {
            Spinner,
            ValidationProvider,
            ValidationObserver,
            InputComponent,
            ValidateErrorComponent,
            ResponseMessageComponent,
        },
        data() {
            return {
                payload: {},
                response: {
                    message: '',
                    color: '',
                },
                spinner: {
                    forgot_password: false,
                },
            };
        },
        methods: {
            async forgotPassword() {
                const validator = await this.$refs.forgotPasswordForm.validate();

                if (!validator) {
                    return;
                }

                this.spinner.forgot_password = true;

                this.$axios.post('v1/forgot-password', this.payload).then(() => {
                    this.response.color = 'green';
                    this.response.message = 'Enviamos um e-mail com intruções para recuperação da senha.';
                    this.spinner.forgot_password = false;
                })
                    .catch((e) => {
                        this.spinner.forgot_password = false;
                        const errorCode = e?.response?.data?.error || 'ServerError';
                        this.response.color = 'red';
                        this.response.message = message[errorCode];
                    });
            },
        },
    };
</script>