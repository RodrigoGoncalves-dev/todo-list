export default {
    namespaced: true,
    state: () => ({

    }),
    mutations: {
        STORE_USER(state, user) {
            state.user = user;
        },
    },
    actions: {},
};