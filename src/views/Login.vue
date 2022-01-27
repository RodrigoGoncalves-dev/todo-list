<template>
    <div class="h-screen flex items-center justify-center bg-gray-900 content-center">
        <div class="grid gap-2 w-80">
            <p class="text-gray-50 text-xl font-medium mb-8 text-left">
                Seja bem indo a melhor plataforma
                <span class="text-gray-50 text-xl font-extrabold">
                    de lista de tarefas!
                </span>
            </p>
            <LoginCard />
        </div>
    </div>
</template>

<script>
    import LoginCard from '@/components/LoginCard';

    export default {
        name: 'Login',
        components: {
            LoginCard,
        },
    };
</script>
