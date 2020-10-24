<template>
	<v-container fill-height fluid>
		<v-row class="justify-center align-center">
			<v-col cols="12" sm="8" md="6" lg="4" xl="3">
				<v-card class="pt-5 loginCard">
					<v-alert type="error" v-if="userFeedback" dismissible class="mt-n5">{{ errorMessage }}</v-alert>
					<v-card-title class="justify-center headline">Login to admin dashboard</v-card-title>
					<v-form v-if="!isPasswordFormChanged" v-model="valid">
						<v-card-text>
							<v-row class="justify-center">
								<v-col cols="12" md="11">
									<v-text-field
										label="Email"
										v-model="email"
										:rules="emailRules"
										color="#708D81"
										type="email"
										required>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row class="justify-center mt-n5">
								<v-col cols="12" md="11">
									<v-text-field
										label="Password"
										type="password"
										color="#708D81"
										:rules="passwordRules"
										v-model="password"
										@keyup.enter="loginWithEmailAndPassword()">
									</v-text-field>
								</v-col>
							</v-row>
						</v-card-text>
						<v-card-actions class="ma-1 mt-n5">
							<v-row class="justify-center">
								<v-col cols="12" md="11">
									<v-btn block color="#708D81"
										@click="loginWithEmailAndPassword($event)"
										:disabled="!valid"
										:loading="isLoginLoading"
										class="white--text">Login
									</v-btn>
								</v-col>
							</v-row>
						</v-card-actions>
					</v-form>
					<v-form v-if="isPasswordFormChanged" ref="newPassword" v-model="valid">
						<v-row class="justify-center">
							<v-col cols="12" md="10" xl="8">
								<label>Please enter a new password</label>
								<v-text-field
									v-model="newPassword"
									:rules="passwordRules"
									type="password"
									outlined
									dense>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row class="justify-center mt-n6 mb-5">
							<v-col cols="12" md="10" xl="8">
								<v-btn block large color="primary"
									class="white--text"
									type="submit"
									@click="loginWithEmailAndPassword($event)"
									:loading="isLoginLoading"
									:disabled="!valid">
									Save and Continue
								</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: 'login',
	layout: 'admin',
	data () {
		return {
			email: '',
			password: '',
			newPassword: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+/.test(v) || 'E-mail must be valid'
			],
			passwordRules: [
				v => !!v || 'Password is required'
			],
			userFeedback: false,
			errorMessage: '',
			valid: false,
			newPasswordEntered: false,
			isPasswordFormChanged: false,
			isLoginLoading: false
		}
	},
	watch: {
		newPassword (value) {
			this.newPasswordEntered = value ? true : false
		}
	},
	methods: {
		loginWithEmailAndPassword: function (e) {
			this.isLoginLoading = true
			e.preventDefault()
			if (this.email && this.password && !this.newPasswordEntered && this.newPassword === '') {
				this.$store.dispatch('modules/user/signUserIn', {
					email: this.email,
					password: this.password,
					loginTime: Number(Date.now()),
					isPasswordChanged: false
				}).then((response) => {
					if (response && response.setNewPassword) {
						this.isPasswordFormChanged = true
					} else if (response && response.status === 'success') {
						this.$router.push('/admin')
					}
				}).catch(error => {
					console.log('Error:', error)
					this.userFeedback = true
					this.errorMessage = error
				}).finally(() => this.isLoginLoading = false)
			} else if (this.email && this.newPassword !== '' && this.newPasswordEntered) {
				this.$store.dispatch('modules/user/signUserIn', {
					email: this.email,
					password: this.newPassword,
					loginTime: Number(Date.now()),
					isPasswordChanged: true
				}).then((response) => {
					if (response && response.status === 'success') {
						this.$router.push('/admin')
					}
				}).catch(error => {
					console.log('Error:', error)
					this.userFeedback = true
					this.errorMessage = error
				}).finally(() => this.isLoginLoading = false)
			}
		}
	}
}
</script>

<style scoped>
.loginCard {
	margin-top: -30% !important;
}
</style>