<template>
	<v-container fill-height fluid>
		<v-row class="justify-center align-center">
			<v-col cols="12" sm="8" md="6" lg="4" xl="3">
				<v-card class="pt-5">
					<v-card-title class="justify-center headline">Login to dashboard</v-card-title>
					<v-card-text>
						<v-row class="justify-center">
							<v-col cols="12" md="11">
								<v-text-field
									label="Email"
									v-model="email"
									:rules="emailRules"
									type="email">
								</v-text-field>
							</v-col>
						</v-row>
						<v-row class="justify-center mt-n5">
							<v-col cols="12" md="11">
								<v-text-field
									label="Password"
									type="password"
									v-model="password">
								</v-text-field>
							</v-col>
						</v-row>
						<v-row class="justify-center">
							<p>* some info text here ... </p>
						</v-row>
					</v-card-text>
					<v-card-actions class="ma-1">
						<v-row class="justify-center">
							<v-col cols="12" md="11">
								<v-btn block color="green darken-2" dark @click="loginWithEmailAndPassword()">Login</v-btn>
							</v-col>
						</v-row>
					</v-card-actions>
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
		}
	},
	methods: {
		loginWithEmailAndPassword () {
			this.$store.dispatch('user/signUserIn', {email: this.email, password: this.password})
			.then((result) => {
				if (result.status === 'success') {
					this.$router.push('/admin')
				}
			})
		}
	}
}
</script>