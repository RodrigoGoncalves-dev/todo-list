<template>
    <div
        v-if="message"
        :class="`rounded-sm xxxsm:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 bg-${color}-100 p-4 mb-4`"
    >
        <h3 :class="`text-sm leading-5 font-medium text-${color}-800 text-left`">
            {{ message }}
        </h3>
    </div>
</template>

<script>
    export default {
        name: 'ResponseMessageComponent',
        props: {
            message: {
                type: String,
            },
            color: {
                type: String,
            },
        },
    };
</script>