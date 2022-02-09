<template>
    <div class="grid grid-rows-1 space-x-0.5 justify-items-center mb-5">
        <RouterLink
            to="/login"
            active-class="row-start-1 text-gray-500 text-lg font-medium border-b-2 border-blue-700 p-5"
            class="row-start-1 text-gray-500 text-lg font-medium p-5"
        >
            Login
        </RouterLink>
        <RouterLink
            to="/registrar"
            active-class="row-start-1 text-gray-500 text-lg font-medium border-b-2 border-blue-700 p-5"
            class="row-start-1 text-gray-500 text-lg font-medium p-5"
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