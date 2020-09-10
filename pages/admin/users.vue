<template>
	<v-container fluid>
		<!-- ADD NEW USER DIALOG -->
		<v-dialog v-model="addNewAdminDialog" max-width="460" persistent>
			<v-card>
				<v-card-title class="justify-center grey--text text--darken-3">
					<span class="ml-2">Add New Admin</span>
					<v-spacer />
					<v-btn @click="closeAddNewAdmin()" icon><v-icon>mdi-close</v-icon></v-btn>
				</v-card-title>
				<v-form v-model="valid">
					<v-card-text>
						<v-row class="justify-center mt-n5">
							<v-col cols="12" md="11">
								<v-text-field
									label="Email"
									v-model="newAdminEmail"
									:rules="emailRules"
									required>
								</v-text-field>
								<v-row v-if="!generatedPass" class="mx-0 my-2">
									<v-btn @click="generatePassword()" block color="grey lighten-2" class="primary--text text--darken-2">Generate Password</v-btn>
								</v-row>
								<v-row v-if="generatedPass">
									<v-col cols="12">
										<label>Generated Password</label>
										<v-text-field v-model="generatedPass" readonly dense outlined filled>
											<v-tooltip slot="append-outer" left>
												<template v-slot:activator="{ on }">
													<v-icon
														v-on="on"
														@click="copyUploadUrlToClipboard()"
														color="blue-grey darken-2"
													>mdi-content-copy</v-icon>
												</template>
												<span>Copy generated password to clipboard</span>
											</v-tooltip>
										</v-text-field>
									</v-col>
								</v-row>
								<v-row class="justify-center mt-n6 mb-2">
									<p v-if="isPasswordCopied" class="mb-n1 caption blue-grey--text">Generated password copied to clipboard!</p>
								</v-row>
								<v-row class="mx-0 justify-space-between">
									<v-btn 
										:disabled="!generatedPass || !newAdminEmail || !valid"
										color="#708D81" dark block
										@click="addNewAdmin()" :loading="isSavingAdminLoading">
										<span class="mx-2">Save</span>
									</v-btn>
								</v-row>
							</v-col>
						</v-row>
					</v-card-text>
				</v-form>
			</v-card>
		</v-dialog>
		<!-- DELETE CONFIRMATION DIALOG-->
		<v-dialog v-model="deleteDialog" max-width="340">
			<v-card>
				<v-card-title>Are you sure want to delete the selected user?</v-card-title>
				<v-card-actions class="justify-space-between">
					<v-btn text @click="deleteDialog = false">Close</v-btn>
					<v-btn text @click="deleteUser()">Yes</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-row class="justify-center">
			<v-col cols="12" md="10" lg="8">
				<v-alert v-if="feedbackAlert" :type="feedbackType" dismissible>{{ feedbackMessage }}</v-alert>
				<v-data-table
					:items="users"
					:headers="headers"
					:loading="isDataLoading || !users.length"
					class="elevation-2">
					<template v-slot:top>
						<v-row class="mx-3 pt-2">
							<v-icon x-large color="#708D81">mdi-account-multiple</v-icon>
							<span class="title ml-2 mt-1">Manage Admins</span>
							<v-spacer />
							<v-btn small color="#708D81" dark class="mt-1" @click="addNewAdminDialog = true"><v-icon class="mr-2">mdi-plus</v-icon>Add New Admin</v-btn>
						</v-row>
					</template>
					<template v-slot:[`item.lastLogin`]="{item}">
						<span v-if="item.lastLogin=== 'No login record'">Account not activated yet</span>
						<span v-else>{{ formatDate(item.lastLogin) }}</span>
					</template>
					<template v-slot:[`item.actions`]="{item}">
						<v-tooltip bottom>
							<template v-slot:activator="{on}">
								<v-btn @click="selectUserForDelete(item.id)" icon v-on="on"><v-icon color="red">mdi-delete-outline</v-icon></v-btn>
							</template>
							<span>Delete</span>
						</v-tooltip>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { auth } from '~/plugins/firebase.js'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
	layout: 'admin',
	data () {
		return {
			headers: [
				{ text: 'Email', align: 'center', value: 'email', sortable: false },
				{ text: 'FirebaseID', align: 'center', value: 'id', sortable: false },
				{ text: 'Last Login', align: 'center', value: 'lastLogin' },
				{ text: 'Actions', align: 'center', value: 'actions', sortable: false }
			],
			addNewAdminDialog: false,
			valid: false,
			newAdminEmail: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+/.test(v) || 'E-mail must be valid'
			],
			generatedPass: '',
			isPasswordCopied: false,
			isDataLoading: false,
			isSavingAdminLoading: false,
			feedbackAlert: false,
			feedbackType: 'info',
			feedbackMessage: '',
			deleteDialog: false,
			selectedUserId: ''
		}
	},
	created () {
		this.isDataLoading = true
		this.$store.dispatch('user/fetchAllUsers').finally(() => this.isDataLoading = false)
		auth.onAuthStateChanged(user => {
			if (!user) {
				this.$router.push('/admin/login')
			} else {
				this.$store.commit('user/setUser', {id: user.uid, email: user.email})
			}
		})
	},
	computed: {
		...mapGetters('user', {
			users: 'getAllUsers'
		})
	},
	methods: {
		formatDate (dateTotransform) {
			var date = new Date(dateTotransform)
			return moment(date).format("MMMM DD, YYYY HH:mm:ss")
		},
		generatePassword () {
			var result = "";
			var characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var charactersLength = characters.length;
			for (var i = 0; i < 10; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * charactersLength)
				);
			}
			this.generatedPass = result;
		},
		copyUploadUrlToClipboard () {
			let textarea = document.createElement('textarea')
			textarea.value = this.generatedPass.toString()
			document.body.appendChild(textarea)
			textarea.focus()
			textarea.select()
			document.execCommand("copy")
			document.body.removeChild(textarea)
			this.isPasswordCopied = true;
			setTimeout(() => {
				this.isPasswordCopied = false;
			}, 5000);
		},
		closeAddNewAdmin () {
			this.addNewAdminDialog = false
			this.newAdminEmail = ''
			this.generatedPass = ''
		},
		addNewAdmin () {
			this.isSavingAdminLoading = true
			this.$store.dispatch('user/saveUserInvitation', {
				email: this.newAdminEmail,
				oneTimePass: this.generatedPass
			}).then(res => {
				this.setUserFeedback('success', 'New Admin Added successfully!')
			}).catch(error => {
				console.log('Error occured during adding new user: ', error)
				this.setUserFeedback('error', error.message)
			}).finally(() => {
				this.isSavingAdminLoading = false
				this.addNewAdminDialog = false
			})
		},
		selectUserForDelete (id) {
			this.selectedUserId = id
			this.deleteDialog = true
		},
		deleteUser () {
			const id = this.selectedUserId
			console.log('Delete User ID:', id)
			this.$store.dispatch('user/deleteUser', id).then(res => {
				this.setUserFeedback('success', 'User deleted successfully!')
			}).catch(error => {
				console.log('Error during deleting user:', error)
				this.setUserFeedback('error', error.message)
			}).finally(() => {
				this.deleteDialog = false
				this.selectedUserId = ''
			})
		},
		setUserFeedback(type, message) {
			this.feedbackType = type
			this.feedbackMessage = message
			this.feedbackAlert = true
			setTimeout(() => {
				this.feedbackAlert = false
			}, 10000);
		}
	}
}

</script>