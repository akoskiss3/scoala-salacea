import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './user.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
	modules: {
		userStore
	}
});