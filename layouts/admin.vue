<template>
	<v-app>
		<v-app-bar v-if="userStore" clipped-left fixed app color="#C7BCA8">
			<v-tooltip bottom>
				<template v-slot:activator="{on}">
					<v-btn icon depressed class="mr-2" to="/admin" v-on="on">
						<v-icon large color="#2A262C">mdi-view-dashboard</v-icon>
					</v-btn>
				</template>
				<span>Home</span>
			</v-tooltip>
			<v-toolbar-title>"Balaskó Nándor" School Admin</v-toolbar-title>
			<v-spacer />
			<v-btn text to="/"><v-icon class="mr-2">mdi-home-export-outline</v-icon>Main Page</v-btn>
			<v-btn text @click="logout()"><v-icon class="mr-2">mdi-location-exit</v-icon>Logout</v-btn>
		</v-app-bar>
		<v-main>
			<nuxt />
		</v-main>

		<v-footer absolute app>
			<v-row class="justify-center">
				<span>&copy; {{ new Date().getFullYear() }}</span>
			</v-row>
		</v-footer>
	</v-app>
</template>
<script>
import { mapGetters } from 'vuex'
import { auth } from '~/plugins/firebase.js'

export default {
	computed: {
		...mapGetters('user', {
			userStore: 'getUser'
		})
	},
	methods: {
		logout () {
			this.$store.dispatch('user/userLogOut').then(() => {
				this.$router.push('/admin/login')
			})
		}
	}
};
</script>

<style scoped>
.v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active:before {
	opacity: 0 !important;
}
</style>