<template>
    <div class="grid gap-2">
        <h3 class="py-2 mb-4 text-gray-500 text-xl font-medium text-center">
            Esqueci minha senha
        </h3>

        <div>
            <input
                type="email"
                class="bg-gray-800 xxxsm:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 h-11 p-5 text-gray-50 text-lg placeholder-gray-400 border border-gray-800 rounded-sm focus:outline-none"
                placeholder="Digite seu e-mail"
            >
        </div>
        <button
            type="submit"
            class="bg-gray-700 xxxsm:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 flex items-center justify-center hover:bg-gray-800 text-gray-50 font-bold h-11 rounded-sm mt-3"
        >
            <Spinner
                class="animate-spin w-5 h-5 mr-2"
            />
            Acessar conta
        </button>
    </div>
</template>

<script>
    import Spinner from '@/components/Spinner/Spinner';

    export default{
        name: 'ForgotPassword',
        components: {
            Spinner,
        },
        data() {

        },
        methods: {},
    };
</script>