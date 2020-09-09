import { db, auth } from '~/plugins/firebase.js'

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
		return new Promise((resolve, reject) => {
			dispatch('signInWithExistingAccount', {
				email: payload.email,
				password: payload.password,
				loginTime: payload.loginTime
			}).then(() => {
				resolve({ status: 'success' })
			}).catch(error => {
				reject(error)
			})
		})
	},
	signInWithExistingAccount({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(payload.email, payload.password).then(user => {
				console.log('User:', user)
                const key = user.user.uid
                const lastLoginTime = payload.loginTime
                const userName = payload.name ? payload.name : user.user.email.split('@')[0]
                commit('setUser', {
					id: key,
					email: user.user.email
				})
				db.ref('users').orderByKey().equalTo(key).once('value', (snapshot) => {
                    let userKey = snapshot.val()
                    if (userKey) {
						db.ref('users').child(key).update({lastLogin: lastLoginTime})
						resolve()
                    } else {
                        db.ref('users').child(key).set({
                            name: userName,
                            email: user.user.email,
                            lastLogin: lastLoginTime
						})
						resolve()
                    }
                })
            }).catch(error => {
                console.log('Error:', error)
                reject(error && error.message ? error.message : error)
            })
        })
	},
	userLogOut ({ commit }, payload) {
		return auth.signOut().then(() => {
			console.log('User logged out!')
			commit('setUser', null)
		})
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}