<template>
	<v-container>
		<v-dialog v-model="addOrEditNews" width="600">
			<v-card class="elevation-2">
				<v-card-text class="pt-5">
					<v-textarea v-model="newsText" outlined label="Add text"></v-textarea>
				</v-card-text>
				<v-card-actions class="justify-space-between mt-n5 mx-1">
					<v-btn text @click="addOrEditNews = false" color="red darken-3">Close</v-btn>
					<v-btn v-if="!dialogOpenedForEdit" text color="green darken-2" :disabled="!newsText.length" @click="addNewsFeedItem()">Save</v-btn>
					<v-btn v-else text color="green darken-2" :disabled="!newsText.length" @click="submitEditNews()">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		
		<v-row class="justify-center">
			<v-col cols="12" md="10" xl="8">
				<v-card outlined class="elevation-1">
					<v-simple-table>
						<template v-slot:default>
							<thead>
								<tr>
									<th class="text-left subtitle-1"><span color="#708D81">News feed items</span></th>
									<th class="text-right">
										<v-btn text class="mr-n3" color="grey darken-2" @click="addOrEditNews = true"><v-icon class="mr-1">mdi-plus</v-icon>Add</v-btn>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in news" :key="index">
									<td>{{ item }}</td>
									<td class="text-right">
										<v-tooltip bottom open-delay="300">
											<template v-slot:activator="{on}">
												<v-btn icon small @click="editNewsFeed(index, item)" v-on="on">
													<v-icon color="green darken-2">mdi-pencil</v-icon>
												</v-btn>
											</template>
											<span>Edit</span>
										</v-tooltip>
										
										<v-tooltip bottom open-delay="300">
											<template v-slot:activator="{on}">
												<v-btn icon small @click="deleteItemFromNews(index)" v-on="on">
													<v-icon color="red darken-2">mdi-delete</v-icon>
												</v-btn>
											</template>
											<span>Delete</span>
										</v-tooltip>
									</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	layout: 'admin',
	data () {
		return {
			newsText: '',
			addOrEditNews: false,
			dialogOpenedForEdit: false,
			editedItemIndex: ''
		}
	},
	mounted () {
		this.$store.dispatch('modules/news/getNewsFromDatabase')
	},
	computed: {
		...mapGetters('modules/news', { news: 'getNews' })
	},
	methods: {
		addNewsFeedItem () {
			this.dialogOpenedForEdit = false
			this.$store.dispatch('modules/news/addNewsFeedItem', this.newsText).then(() => {
				this.addOrEditNews = false
				this.newsText = ''
			}).catch(error => {
				console.log('Addig new item failed:', error.message)
			})
		},
		deleteItemFromNews (id) {
			this.$store.dispatch('modules/news/deleteItemFromNews', id)
			.catch(error => {
				console.log('Deleting item failed:', error.message)
			})
		},
		editNewsFeed (id, text) {
			this.newsText = text
			this.editedItemIndex = id
			this.dialogOpenedForEdit = true
			this.addOrEditNews = true
		},
		submitEditNews () {
			this.$store.dispatch('modules/news/updateNewsItem', {
				id: this.editedItemIndex,
				text: this.newsText
			}).then(() => {
				this.addOrEditNews = false
				this.newsText = ''
				this.dialogOpenedForEdit = false
			}).catch(error => {
				console.log('Updating item failed:', error.message)
			})
		}
	}
}
</script>