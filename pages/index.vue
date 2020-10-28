<template>
	<v-container>
		<v-row class="justify-center">
			<v-img max-width="1000" :src="require('@/assets/header_cover.jpg')"></v-img>
		</v-row>
		<v-row class="justify-center">
			<v-img class="balaskoStatue" :src="require('@/assets/balasko.png')" />
		</v-row>
		<v-row class="justify-center mt-3">
			<span class="display-2">Școala Gimnazială "Balaskó Nándor" Sălacea</span>
		</v-row>

		<v-row class="menuCards justify-center">
			<template v-for="(card, index) in cards">
				<v-col :key="index" cols="12" md="3">
					<v-card height="150" :to="card.navigateTo" :color="card.color">
						<v-card-title class="display-1 justify-center">{{ card.title }}</v-card-title>
						<v-card-text>
							<v-row class="justify-center">
								<v-icon x-large>{{ card.icon }}</v-icon>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</template>
		</v-row>
	</v-container>
</template>

<script>

export default {
	layout: "default",
	data() {
		return {
			cards: [
				{ title: 'News', icon: 'mdi-newspaper-variant-multiple-outline', color: 'amber lighten-2', navigateTo: '/articles' },
				{ title: 'Gallery', icon: 'mdi-image', color: 'teal lighten-4', navigateTo: '/gallery' },
				{ title: 'Documents', icon: 'mdi-file-document-multiple', color: 'brown lighten-3', navigateTo: '/documents' },
				{ title: 'Contact', icon: 'mdi-account-multiple', color: 'blue-grey lighten-3', navigateTo: '/contact' }
			]
		};
	}
};
</script>
<style scoped>
.balaskoStatue {
	max-width: 100px;
}
.menuCards {
	width: 80vw;
	position: absolute;
	bottom: 0px; 
}
</style>
