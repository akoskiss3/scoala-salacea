import { db, auth } from '~/plugins/firebase.js'

const state = () => ({
	user: null,
	admins: []
});

const mutations = {
    setUser (state, payload) {
        state.user = payload
	},
	setAdmins(state, payload) {
		state.admins = payload
	},
	addUserToState (state, payload) {
		state.admins.push(payload)
	},
	removeUser (state, payload) {
		const allUsers = state.admins
        allUsers.forEach((value, index) => {
            if (value.id === payload) {
                state.admins.splice(index, 1)
            }
        })
	}
};

const getters = {
    getUser (state) {
        return state.user
	},
	getAllUsers (state) {
		return state.admins
	}
};

const actions = {
    signUserIn ({commit, dispatch}, payload) {
		return new Promise((resolve, reject) => {
			db.ref('users').orderByChild('email').equalTo(payload.email).once('value', (snapshot) => {
				if (snapshot.val() !== null) {
					const parent = snapshot.val()
					const invitationObjectId = Object.keys(parent)[0]
					snapshot.forEach(childSnapshot => {
						const userInDb = childSnapshot.val()
						if (userInDb.email === payload.email && userInDb.lastLogin === 'No login record') {
							if (!payload.isPasswordChanged && userInDb.oneTimePass && userInDb.oneTimePass === payload.password) {
								resolve({ setNewPassword: true })
							} else if (payload.isPasswordChanged && userInDb.oneTimePass !== payload.password) {
								return auth.createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
									const key = user.user.uid
									commit('setUser', {	id: key, email: user.user.email	})
									db.ref('users').child(key).set({
										email: user.user.email,
										name: user.user.email.split('@')[0],
										lastLogin: payload.loginTime
									}).then(() => {
										dispatch('deleteUser', invitationObjectId).then(() => {
											resolve({ status: 'success'} )
										})
									})
								})
							} else if (!payload.isPasswordChanged && userInDb.oneTimePass && userInDb.oneTimePass !== payload.password) {
                                reject('Please enter a valid password!')
                            }
						} else if (userInDb.email === payload.email && userInDb.lastLogin !== 'No login record.') {
							return dispatch('signInWithExistingAccount', { 
								email: payload.email,
								password: payload.password,
								loginTime: payload.loginTime
							}).then(() => {
								resolve({ status: 'success' })
							}).catch(error => {
								reject(error && error.message ? error.message : error)
							})
						}
					})
				} else {
					dispatch('signInWithExistingAccount', { 
						email: payload.email,
						password: payload.password,
						loginTime: payload.loginTime
					}).then(() => {
						resolve({ status: 'success' })
					}).catch(error => {
						reject(error && error.message ? error.message : error)
					})
				}
			})
		})
	},
	signInWithExistingAccount({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(payload.email, payload.password).then(user => {
				console.log('Authenticated User:', user)
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
						db.ref('users').child(key).update({ lastLogin: lastLoginTime })
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
	fetchAllUsers ({commit}, payload) {
		db.ref('users').once('value').then(snapshot => {
			const allUsers = snapshot.val()
			let admins = []
			for (let id in allUsers) {
				admins.push({id: id, ...allUsers[id]})
			}
			commit('setAdmins', admins)
		}).catch(error => {
			console.log('Error fetching users from database:', error)
		})
	},
	saveUserInvitation ({ commit}, payload) {
		const data = {
			...payload,
			lastLogin: 'No login record'
		}
		return db.ref('users').push(data).then(res => {
			commit('addUserToState', {id: res.key, ...data })
			return { status: 'success'} 
		}).catch(err => {
			console.log('Error during saving new admin.')
			return { status: 'error', message: 'err'}
		})
	},
	deleteUser ({commit}, payload) {
		return db.ref('users').child(payload).remove().then(() => {
			commit('removeUser', payload)
			return { status: 'success'}
		}).catch(error => {
			return { status: 'error', message: error}
		})
	},
	userLogOut ({ commit }, payload) {
		return auth.signOut().then(() => {
			console.log('User logged out!')
			window.$nuxt.$cookies.remove('authToken')
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