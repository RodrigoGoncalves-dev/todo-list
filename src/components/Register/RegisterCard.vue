<template>
    <div class="h-72 xxxsm:w-80 2xl:w-96">
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
            ref="registerForm"
            tag="form"
            @submit.stop.prevent="register"
        >
            <div class="grid gap-2">
                <div class="flex">
                    <div class="w-1/2 mr-4">
                        <ValidationProvider
                            v-slot="{ errors }"
                            rules="required"
                            name="nome"
                        >
                            <input
                                type="text"
                                v-model="payload.first_name"
                                class="bg-gray-800 xxxsm:w-36 sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 row-start-1 h-11 p-3 text-gray-50 text-lg placeholder-gray-400 font-light border border-gray-800 rounded-sm focus:outline-none"
                                placeholder="Seu nome"
                            >
                            <div
                                v-if="!!errors[0]"
                                class="text-red-500 text-s mb-2"
                            >
                                {{ errors[0] }}
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="w-1/2 ml-4">
                        <input
                            type="text"
                            v-model="payload.last_name"
                            class="bg-gray-800 xxxsm:w-36 sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 row-start-1 h-11 p-3 text-gray-50 text-lg placeholder-gray-400 font-light border border-gray-800 rounded-sm focus:outline-none"
                            placeholder="Seu sobrenome"
                        >
                    </div>
                </div>
                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|email"
                    name="e-mail"
                >
                    <input
                        type="email"
                        v-model="payload.email"
                        class="bg-gray-800 xxxsm:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 h-11 p-3 text-lg text-gray-50 placeholder-gray-400 font-light border border-gray-800 rounded-sm focus:outline-none"
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
                    :rules="{required: true, regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+?/}"
                    name="senha"
                >
                    <input
                        type="password"
                        v-model="payload.password"
                        class="bg-gray-800 xxxsm:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 h-11 p-3 text-lg text-gray-50 placeholder-gray-400 font-light border border-gray-800 rounded-sm focus:outline-none"
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
                    :disabled="spinner.register"
                    class="bg-gray-700 flex items-center justify-center hover:bg-gray-800 text-gray-50 font-bold h-11 rounded-sm mt-3"
                >
                    <Spinner
                        class="animate-spin w-5 h-5 mr-2"
                        v-if="spinner.register"
                    />
                    Acessar conta
                </button>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>
    import LoginMenu from '@/components/Login/LoginMenu';
    import { ValidationObserver, ValidationProvider} from 'vee-validate';
    import Spinner from '@/components/Spinner/Spinner';
    import message from '@/utils/message';

    export default {
        name: 'RegisterCard',
        components: {
            LoginMenu,
            ValidationProvider,
            ValidationObserver,
            Spinner,
        },
        data(){
            return {
                payload: {},
                response: {
                    color: '',
                    message: '',
                },
                spinner: {
                    register: false,
                },
            };
        },
        methods: {
            async register() {
                const validator = this.$refs.registerForm.validate();
                if(!validator) {return;}

                this.resetResponse();

                this.spinner.register = true;

                this.$axios.post('v1/register', this.payload)
                    .then(() => {
                        this.response.color = 'green';
                        this.response.message = 'Seu usuário foi criado com sucesso';
                        this.resetForm();
                    })
                    .catch((e)=>{
                        this.spinner.register = false;
                        const errorCode = e?.response?.data?.error || 'ServerError';
                        this.response.color = 'red';
                        this.response.message = message[errorCode];
                    })
                    .finally(() => {
                        this.spinner.register = false;
                    });
            },

            resetResponse() {
                this.response.color = '';
                this.response.message = '';
            },

            resetForm() {
                this.$refs.registerForm.reset();
                this.payload = {};
            },
        },
    };
</script>