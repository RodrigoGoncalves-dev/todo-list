<template>
    <div style="height: 300px">
        <LoginMenu />
        <div
            v-if="response.message"
            :class="`rounded-sm bg-${response.color}-100 p-4 mb-4`"
        >
            <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
                {{ response.message }}
            </h3>
        </div>

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
                    <input
                        v-model="payload.email"
                        type="email"
                        class="bg-gray-800 w-96 h-11 p-5 text-gray-50 text-lg placeholder-gray-400 border border-gray-800 rounded-sm focus:outline-none"
                        placeholder="Digite seu e-mail"
                    >
                    <div
                        v-if="!!errors[0]"
                        class="text-red-500 text-s mb-2"
                    >
                        {{ errors[0] }}
                    </div>
                </ValidationProvider>
                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="senha"
                >
                    <input
                        v-model="payload.password"
                        type="password"
                        class="bg-gray-800 w-96 h-11 p-5 text-gray-50 text-lg placeholder-gray-400 border border-gray-800 rounded-sm focus:outline-none"
                        placeholder="Digite sua senha"
                    >
                    <div
                        v-if="!!errors[0]"
                        class="text-red-500 text-s mb-2"
                    >
                        {{ errors[0] }}
                    </div>
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
                <span class="text-gray-600 hover:text-gray-300 text-center mt-4 font-light">
                    Esqueci minha senha
                </span>
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

    export default {
        name: 'LoginCard',
        components: {
            Spinner,
            ValidationProvider,
            ValidationObserver,
            LoginMenu,
        },
        data() {
            return {
                email: '',
                password: '',
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