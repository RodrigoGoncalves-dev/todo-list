<template>
    <div>
        <input
            v-model="email"
            type="email"
            class="bg-gray-600 placeholder-gray-200 font-light border border-gray-900 focus:outline-none"
        >
        <input
            v-model="password"
            type="password"
            class="bg-gray-600 placeholder-gray-200 font-light border border-gray-900 focus:outline-none"
        >
        <button @click.stop.p.prevent="login">
            Clique
        </button>
    </div>
</template>

<script>
    import Cookie from 'js-cookie';

    export default {
        name: 'Home',
        components: {

        },
        data() {
            return {
                email: '',
                password: '',
            };
        },
        methods: {
            login(){
                const payload = {
                    email: this.email,
                    password: this.password,
                };

                this.$axios.post('v1/login', payload).then((response) => {
                    console.log(response);
                    const token = `${response.data.token_type}${response.data.access_token}`;
                    Cookie.set('_todolist_token', token, { expires: 30 });
                });
            },
        },
    };
</script>
