<template>
    <div style="height: 300px">

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
                        class="bg-gray-500 w-80 h-11 p-3 text-lg placeholder-gray-900 font-light border border-gray-500 rounded-sm focus:outline-none"
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
                        class="bg-gray-500 w-80 h-11 p-3 text-lg placeholder-gray-900 font-light border border-gray-500 rounded-sm focus:outline-none"
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
                    class="bg-gray-700 hover:bg-gray-800 text-gray-50 font-bold h-11 rounded-sm mt-3"
                >
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
    import Cookie from 'js-cookie';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    import message from '@/utils/message';

    export default {
        name: 'LoginCard',
        components: {
            ValidationProvider,
            ValidationObserver,
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
            };
        },
        methods: {
            async login(){
                const validator = await this.$refs.loginForm.validate();

                if(!validator) return;

                this.resetResponse();

                this.$axios.post('v1/login', this.payload).then((response) => {
                    console.debug(response);
                    const token = `${response.data.token_type}${response.data.access_token}`;
                    Cookie.set('_todolist_token', token, { expires: 30 });

                    this.$store.commit('user/STORE_USER', response.data.data);
                }).catch((e) => {
                    const errorCode = e?.response?.data?.error || 'ServerError';
                    console.debug('error');
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