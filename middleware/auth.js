import { auth } from '~/plugins/firebase.js'

export default (app) => {
	return auth.onAuthStateChanged(user => {
		if (!user) {
			return app.redirect('/admin/login')
		}
	})
}