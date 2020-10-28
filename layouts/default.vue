<template>
	<v-app>
		<v-app-bar v-if="isAppBarShown" app absolute dense color="main">
			<v-app-bar-nav-icon>
				<v-img :src="require('@/assets/balasko.png')" class="toolbarIcon" />
			</v-app-bar-nav-icon>
			<v-toolbar-title>Școala Gimnazială "Balaskó Nándor" Sălacea</v-toolbar-title>
			<v-spacer />
			<v-btn icon href="https://www.facebook.com/BANAN1918/"><v-icon x-large color="blue darken-2">mdi-facebook</v-icon></v-btn>
			<template v-slot:extension>
				<v-tabs centered grow>
					<v-tab to="/" class="title">Home</v-tab>
					<v-tab to="/articles" class="title">News</v-tab>
					<v-tab to="/gallery" class="title">Gallery</v-tab>
					<v-tab to="/documents" class="title">Documents</v-tab>
					<v-tab to="/contact" class="title">Contact</v-tab>
				</v-tabs>
			</template>
		</v-app-bar>

		<v-main id="mainContent">
			<v-container>
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
	computed: {
		isAppBarShown () {
			return $nuxt.$route.path.toString() !== '/'
		}
	}
};
</script>

<style scoped>
#mainContent {
	/* https://bgjar.com/stacked-wave.html */
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask3191%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='url(%23SvgjsLinearGradient3192)'%3e%3c/rect%3e%3cpath d='M 0%2c422 C 192%2c467 576%2c631.2 960%2c647 C 1344%2c662.8 1728%2c530.2 1920%2c501L1920 1080L0 1080z' fill='rgba(199%2c 188%2c 168%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask3191'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='89.06%25' y1='-19.44%25' x2='10.94%25' y2='119.44%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient3192'%3e%3cstop stop-color='rgba(234%2c 234%2c 234%2c 0.71)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(234%2c 234%2c 234%2c 0.71)' offset='0.2'%3e%3c/stop%3e%3cstop stop-color='rgba(227%2c 222%2c 191%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
	background-size: 100%;
}
.toolbarIcon {
	max-width: 40px;
	margin-left: 15px;
}
</style>