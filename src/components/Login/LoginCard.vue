<template>
    <div class="h-72">
        <LoginMenu />

        <ResponseMessageComponent
            :message="response.message"
            :color="response.color"
        />

        <ValidationObserver
            ref="loginForm"
            tag="form"
            @submit.stop.prevent="login"
        >
            <div class="grid gap-2">
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
                    <ValidateErrorComponent :error-message="errors"/>
                </ValidationProvider>
                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="senha"
                >
                    <InputComponent
                        v-model="payload.password"
                        input-type="password"
                        placeholder="Digite sua senha"
                    />
                    <ValidateErrorComponent :error-message="errors"/>
                </ValidationProvider>
                <button
                    type="submit"
                    :disabled="spinner.login"
                    class="bg-gray-700 flex items-center justify-center hover:bg-gray-800 text-gray-50 font-bold h-11 rounded-sm mt-3"
                >
                    <Spinner
                        class="animate-spin w-5 h-5 mr-2"
                        v-if="spinner.login"
                    />
                    Acessar conta
                </button>
                <RouterLink
                    to="/esqueceu-senha"
                    class="text-gray-600 hover:text-gray-300 text-center mt-4 font-light"
                >
                    Esqueci minha senha
                </RouterLink>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    import Cookie from 'js-cookie';
    import message from '@/utils/message';
    import LoginMenu from '@/components/Login/LoginMenu';
    import Spinner from '@/components/Spinner/Spinner';
    import InputComponent from '@/components/Input/InputComponent';
    import ValidateErrorComponent from '@/components/ValidateErrorComponent';
    import ResponseMessageComponent from '@/components/ResponseMessageComponent';

    export default {
        name: 'LoginCard',
        components: {
            Spinner,
            InputComponent,
            ValidationProvider,
            ValidationObserver,
            LoginMenu,
            ValidateErrorComponent,
            ResponseMessageComponent,
        },
        data() {
            return {
                response: {
                    color: '',
                    message: '',
                },
                payload: {},
                spinner: {
                    login: false,
                },
            };
        },
        methods: {
            async login(){
                const validator = await this.$refs.loginForm.validate();

                if(!validator) return;

                this.resetResponse();

                this.spinner.login = true;

                this.$axios.post('v1/login', this.payload).then((response) => {

                    const token = `${response.data.token_type}${response.data.access_token}`;
                    Cookie.set('_todolist_token', token, { expires: 30 });

                    this.$store.commit('user/STORE_USER', response.data.data);
                    this.spinner.login = false;
                }).catch((e) => {
                    this.spinner.login = false;
                    const errorCode = e?.response?.data?.error || 'ServerError';
                    this.response.color = 'red';
                    this.response.message = message[errorCode];
                });
            },

            resetResponse() {
                this.response.message = '';
                this.response.color = '';
            },
        },
    };
</script>