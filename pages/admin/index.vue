<template>
	<v-container v-if="userStore" fluid>
		<v-row class="justify-center">
			<v-col cols="12" lg="10" xl="7">
				<v-row class="justify-center">
					<template v-for="(cardItem, index) in dashboardCards">
						<v-col :key="index" cols="12" md="6">
							<v-card class="elevation-3" min-height="190" :to="cardItem.navigateTo">
								<v-card-title>
									<v-icon color="#708D81" size="60">{{ cardItem.icon }}</v-icon>
									<span class="headline ml-5">{{ cardItem.title }}</span>
								</v-card-title>
								<v-card-text>{{ cardItem.description }}</v-card-text>
								<v-card-actions>
									<v-spacer />
									<v-btn text color="grey darken-2" :to="cardItem.navigateTo">
										<span class="mr-3">Manage</span>
										<v-icon>mdi-chevron-right-circle-outline</v-icon>
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</template>
				</v-row>
			</v-col>
		</v-row>

		<!-- <v-row class="justify-center">
			<v-col cols="12" md="10" xl="8">
				<v-card>
					<v-card-text>
						<p>{{ dataFromDb }} </p>
					</v-card-text>
					<v-card-actions>
						<v-btn @click="getItemFromDb()">GET ITEM</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row> -->
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '~/plugins/firebase.js'

export default {
	layout: 'admin',
	middleware: 'auth',
	data() {
		return {
			dashboardCards: [
				{
					icon: 'mdi-newspaper-variant-multiple-outline',
					title: 'News',
					description: 'Manage News feed'
				},
				{
					icon: 'mdi-image',
					title: 'Gallery',
					description: 'Add or remove uploaded pictures',
					navigateTo: '/admin/gallery'
				},
				{
					icon: 'mdi-file-document-multiple',
					title: 'Uploaded Documents',
					description: 'Handle Uploaded Documents',
					navigateTo: '/admin/documents'
				},
				{
					icon: 'mdi-account',
					title: 'Users',
					description: 'Manage Users in the system',
					navigateTo: '/admin/users'
				}
			],
			dataFromDb: null
		};
	},
	computed: {
		...mapGetters('modules/user', {
			userStore: 'getUser'
		})
	},
	methods: {
		async getItemFromDb() {
			let result = await db.ref('news').once('value').then(snapshot => {
				console.log('Snaphot::', snapshot.val())
				this.dataFromDb = snapshot.val()
			})
		}
	}
};
</script>
