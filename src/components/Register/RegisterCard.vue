<template>
    <div class="h-72 xxxsm:w-80 2xl:w-96">
        <LoginMenu />

        <ResponseMessageComponent
            :message="response.message"
            :color="response.color"
        />

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
                            <InputComponent
                                v-model="payload.first_name"
                                input-type="name"
                                placeholder="Seu nome"
                            />
                            <ValidateErrorComponent :error-message="errors"/>
                        </ValidationProvider>
                    </div>
                    <div class="w-1/2 ml-4">
                        <InputComponent
                            v-model="payload.last_name"
                            input-type="email"
                            placeholder="Seu sobrenome"
                        />
                    </div>
                </div>
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
                    :rules="{required: true, regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+?/}"
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
    import InputComponent from '@/components/Input/InputComponent';
    import ResponseMessageComponent from '@/components/ResponseMessageComponent';
    import ValidateErrorComponent from '@/components/ValidateErrorComponent';

    export default {
        name: 'RegisterCard',
        components: {
            LoginMenu,
            ValidationProvider,
            ValidationObserver,
            Spinner,
            ResponseMessageComponent,
            InputComponent,
            ValidateErrorComponent,
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