<template>
	<v-container fluid>
		<v-row class="justify-center mt-n2 mb-n5 ml-n4">
			<v-col cols="12" md="10">
				<v-tooltip bottom>
					<template v-slot:activator="{on}">
						<v-btn icon to="/admin" v-on="on" color="white"><v-icon color="#3F3B41" class="mt-n1" size="25">mdi-chevron-left</v-icon></v-btn>
					</template>
					<span>Back</span>
				</v-tooltip>
				<span class="title font-weight-regular ml-2">Gallery</span>
			</v-col>
		</v-row>
		<v-divider class="mt-3" />
		<v-row class="justify-center mt-4">
			<h1>Gallery Component</h1>
		</v-row>
	</v-container>
</template>

<script>
export default {
	layout: 'admin'
}
</script>