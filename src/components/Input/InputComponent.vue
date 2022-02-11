<template>
    <input
        :type="inputType"
        class="bg-gray-800 xxxsm:w-80 2xl:w-96 h-11 p-5 text-gray-50 text-lg placeholder-gray-400 border border-gray-800 rounded-sm focus:outline-none"
        :placeholder="placeholder"
        @input="handleInput"
    >
</template>

<script>
    export default {
        name: 'InputComponent',
        props: {
            inputType: {
                type: String,
                required: true,
            },
            placeholder: {
                type: String,
                required: false,
            },
        },
        methods: {
            handleInput(e) {
                this.$emit('input', e.target.value);
            },
        },
    };
</script>