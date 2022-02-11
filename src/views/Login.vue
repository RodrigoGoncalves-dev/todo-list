<template>
    <div class="grid gap-2 xxxsm:w-80 2xl:w-96">
        <p class="text-gray-50 text-xl font-medium mb-8 text-left">
            Seja bem indo a melhor plataforma
            <span class="text-gray-50 text-xl font-extrabold">
                de lista de tarefas!
            </span>
        </p>
        <LoginCard />
    </div>
</template>

<script>
    import LoginCard from '@/components/Login/LoginCard';

    export default {
        name: 'Login',
        components: {
            LoginCard,
        },
    };
</script>
