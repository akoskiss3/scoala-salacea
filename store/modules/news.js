import { db } from '~/plugins/firebase.js'

const state = () => ({
	news: {}
});

const mutations = {
    setNews (state, payload) {
		state.news = payload
	},
	setSingleItem (state, payload) {
		state.news[payload.id] = payload.text
	},
	removeItem (state, payload) {
		const allNews = state.news
		for (let index in allNews) {
			if (index === payload) {
				delete state.news[index]
			}
		}
	}
};

const getters = {
    getNews (state) {
		return state.news
	}
};

const actions = {
	getNewsFromDatabase({commit}, payload) {
		db.ref('news').once('value').then(snapshot => {
			commit('setNews', snapshot.val())
		})
	},
	addNewsFeedItem ({commit, state}, payload) {
		return db.ref('news').push(payload).then((result) => {
			const id = result.key
			commit('setNews', { ...state.news, [id]: payload })
		}).catch(error => {
			return { message: error }
		})
	},
	deleteItemFromNews ({commit, state}, payload) {
		return db.ref('news').child(payload).remove().then(() => {
			commit('removeItem', payload)
			commit('setNews', { ...state.news })
			return { status: 'success' }
		}).catch(error => {
			return { message: error }
		})
	},
	updateNewsItem({commit, state}, payload) {
		console.log('Payload', payload)
		return db.ref('news').update({ [payload.id]:payload.text }).then(() => {
			commit('setSingleItem', { id: payload.id, text: payload.text })
			commit('setNews', { ...state.news })
			return { status: 'success' }
		}).catch(error => {
			return { message: error }
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}