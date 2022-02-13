<template>
    <ResponseMessageComponent
        :message="response.message"
        :color="response.color"
    />
</template>

<script>
    import message from '@/utils/message';
    import ResponseMessageComponent from '@/components/ResponseMessageComponent';

    export default {
        name: 'VerifyEmail',
        components: {
            ResponseMessageComponent,
        },
        data() {
            return {
                token: '',
                response: {
                    color: '',
                    message: '',
                },
                spinner: {
                    verifyEmail: false,
                },
            };
        },
        beforeRouteEnter(to, from, next) {
            if(!to.query.token) {
                next({ name: 'Login' });
            }
            next();
        },
        created() {
            this.token = this.$route?.query?.token ;
            this.verifyEmail();
        },
        methods: {
            verifyEmail(){
                this.$axios.post('v1/verify-email', { token: this.token })
                    .then(() => {
                        this.response.color = 'green';
                        this.response.message = 'E-mail verficado com sucesso!';
                    })
                    .catch((e) => {
                        const errorCode = e?.response?.data?.error || 'ServerError';
                        this.response.color = 'red';
                        this.response.message = message[errorCode];
                    });
            },
        },
    };
</script>