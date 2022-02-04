<template>
    <div class="grid grid-rows-1 space-x-0.5 justify-items-center mb-5">
        <RouterLink
            to="/"
            class="row-start-1 text-gray-500 text-lg font-medium active:border-b-2 active:border-blue-700 p-5"
        >
            Login
        </RouterLink>
        <RouterLink
            to="/register"
            class="row-start-1 text-gray-500 text-lg font-medium active:border-b-2 active:border-blue-700 p-5"
        >
            Cadastrar
        </RouterLink>
    </div>
</template>

<script>
    export default {
        name: 'LoginMenu',
        data() {
            return {

            };
        },
        methods: {},
    };
</script>