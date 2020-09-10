<template>
	<v-container fill-height fluid>
		<v-row class="justify-center align-center">
			<v-col cols="12" sm="8" md="6" lg="4" xl="3">
				<v-card class="pt-5 loginCard">
					<v-alert type="error" v-if="userFeedback" dismissible class="mt-n5">{{ errorMessage }}</v-alert>
					<v-card-title class="justify-center headline">Login to admin dashboard</v-card-title>
					<v-form v-model="valid">
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
										@click="loginWithEmailAndPassword()"
										:disabled="!valid"
										class="white--text">Login
									</v-btn>
								</v-col>
							</v-row>
						</v-card-actions>
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
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+/.test(v) || 'E-mail must be valid'
			],
			passwordRules: [
				v => !!v || 'Password is required'
			],
			userFeedback: false,
			errorMessage: '',
			valid: false
		}
	},
	methods: {
		loginWithEmailAndPassword () {
			this.$store.dispatch('user/signUserIn', {
				email: this.email,
				password: this.password,
				loginTime: Number(Date.now())})
			.then((result) => {
				if (result.status === 'success') {
					this.$router.push('/admin')
				}
			}).catch(error => {
				this.userFeedback = true
				this.errorMessage = error
			})
		}
	}
}
</script>

<style scoped>
.loginCard {
	margin-top: -30% !important;
}
</style>