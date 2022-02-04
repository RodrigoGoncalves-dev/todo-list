<template>
    <div>
        <img
            :src='spinner'
            alt='spinner'
        >
    </div>
</template>

<script>
    import spinner from '@/assets/img/spinner.png';

    export default {
        name: 'Spinner',
        data(){
            return {
                spinner: spinner,
            };
        },
    };
</script>