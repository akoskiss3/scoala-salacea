const state = () => ({
	user: null
});

const mutations = {
    setUser (state, payload) {
        state.user = payload
    }
};

const getters = {
    getUser (state) {
        return state.user
    }
};

const actions = {
    signUserIn ({commit, dispatch}, payload) {
		console.log('Sign User in ... ', payload)
		const user = {
			email: payload.email,
			password: 'p@ssw0rd'
		}
		commit('setUser', user)
		return { status: 'success' }
    }
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}