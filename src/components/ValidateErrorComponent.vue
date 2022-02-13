<template>
    <div
        v-if="!!errorMessage[0]"
        class="text-red-500 text-s mb-2"
    >
        {{ errorMessage[0] }}
    </div>
</template>

<script>
    export default {
        name: 'ValidateErrorComponent',
        methods: {},
        props: {
            errorMessage: {
                type: Array,
            },
        },
    };
</script>