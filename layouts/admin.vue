<template>
	<v-app>
		<v-app-bar v-if="userStore" clipped-left fixed app color="#C7BCA8">
			<v-toolbar-title>"Balaskó Nándor" School Admin</v-toolbar-title>
			<v-spacer />
			<v-btn text to="/"><v-icon class="mr-2">mdi-home-export-outline</v-icon>Main Page</v-btn>
			<v-btn text><v-icon class="mr-2">mdi-location-exit</v-icon>Logout</v-btn>
		</v-app-bar>

		<!-- <v-navigation-drawer v-if="userStore" v-model="drawer" :mini-variant="miniVariant" clipped fixed app>
			<v-list>
				<v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer> -->

		<v-main>
			<nuxt />
		</v-main>

		<v-footer absolute app>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			// drawer: true,
			// items: [
			// 	{
			// 		icon: "mdi-apps",
			// 		title: "Dashboard",
			// 		to: "/admin",
			// 	},
			// 	{
			// 		icon: "mdi-file-document-multiple",
			// 		title: "Documents",
			// 		to: "/admin/documents",
			// 	},
			// 	{
			// 		icon: "mdi-image",
			// 		title: "Gallery",
			// 		to: "/admin/gallery",
			// 	}
			// ]
		};
	},
	computed: {
		...mapGetters('user', {
			userStore: 'getUser'
		})
	}
};
</script>