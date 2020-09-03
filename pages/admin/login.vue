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
									label="Username">
								</v-text-field>
							</v-col>
						</v-row>
						<v-row class="justify-center mt-n5">
							<v-col cols="12" md="11">
								<v-text-field
									label="Password"
									type="password">
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
								<v-btn block color="green darken-2" dark>Login</v-btn>
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
	layout: 'admin'
}
</script>