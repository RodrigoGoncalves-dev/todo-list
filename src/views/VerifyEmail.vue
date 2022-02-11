<template>
    <div
        v-if="response.message"
        :class="`rounded-sm bg-${response.color}-100 p-4 mb-4`"
    >
        <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
            {{ response.message }}
        </h3>
    </div>
</template>

<script>
    import message from '@/utils/message';

    export default {
        name: 'VerifyEmail',
        components: {
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