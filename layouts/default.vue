<template>
	<v-app>
		<v-app-bar
			absolute
			color="#6A76AB"
			dark
			prominent short
			shrink-on-scroll
			src="https://picsum.photos/1920/1080?random"
			fade-img-on-scroll
			scroll-target="#mainContent">
			<template v-slot:img="{ props }">
				<v-img
					v-bind="props"
					gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
				></v-img>
			</template>
			<v-toolbar-title>Școala Gimnazială "Balaskó Nándor" Sălacea</v-toolbar-title>
			<template v-slot:extension>
				<v-tabs align-with-title>
					<v-tab to="/">Home</v-tab>
					<v-tab to="/gallery">Gallery</v-tab>
					<v-tab to="/documents">Documents</v-tab>
					<v-tab to="/contact">Contact</v-tab>
				</v-tabs>
				<v-spacer />
				<v-btn icon href="https://www.facebook.com/BANAN1918/"><v-icon large color="blue darken-2">mdi-facebook</v-icon></v-btn>
			</template>
		</v-app-bar>

		<v-main>
			<v-container id="mainContent">
				<nuxt />
			</v-container>
		</v-main>

		<v-footer absolute app color="#C7BCA8">
			<v-row class="justify-center">
				<span>&copy; {{ new Date().getFullYear() }}</span>
			</v-row>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	data() {
		return {}
	},
};
</script>

<style scoped>
#mainContent {
	padding-top: 210px !important;
}
</style>