<template>
	<v-container fluid>
		<v-row class="justify-center moving-news-background mx-8">
			<div class="moving-news py-1">
				<template v-for="(text, index) in news">
					<span
						class="title font-weight-regular grey--text text--darken-3"
						:key="index"
						>{{ text }}&nbsp;&nbsp;&nbsp;&nbsp;</span
					>
				</template>
			</div>
		</v-row>

		<v-row class="justify-center">
			<v-col cols="12" xl="9">
				<v-row class="justify-center">
					<template v-for="(post, index) in posts">
						<v-col cols="12" md="10" lg="6" :key="index">
							<v-card class="mx-auto" max-width="800">
								<v-img :src="post.imgUrl" height="300px"></v-img>
								<v-card-title> {{ post.title }} </v-card-title>
								<v-card-subtitle> {{ post.shortDescription }} </v-card-subtitle>
								<v-card-actions class="justify-space-between">
									<v-btn color="grey darken-2" text>More</v-btn>
									<v-btn icon @click="post.showFullCard = !post.showFullCard"><v-icon>{{ post.showFullCard ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon></v-btn>
								</v-card-actions>
								<v-expand-transition>
									<div v-show="post.showFullCard">
										<v-divider></v-divider>
										<v-card-text>{{ post.fullDescription }}</v-card-text>
									</div>
								</v-expand-transition>
							</v-card>
						</v-col>
					</template>
				</v-row>
			</v-col>
		</v-row>

	</v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	layout: "default",
	data() {
		return {
			posts: [
				{
					title: "Covid ruined school activities",
					shortDescription: 'Just read this article below',
					fullDescription:
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores iste enim, quidem perferendis voluptas rem a blanditiis esse, necessitatibus sit cum. Incidunt vero ratione quasi dignissimos consectetur consequatur, tempora voluptatibus.",
					imgUrl: "https://i.picsum.photos/id/20/1920/1080.jpg?hmac=Utrr9fAysRiBfDa6fjzMkaTB0zlNK2Ll3v9_QyvX3VQ",
					showFullCard: false
				},
				{
					title: "Top western road trips",
					shortDescription: '1,000 miles of wonder',
					fullDescription:
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores iste enim, quidem perferendis voluptas rem a blanditiis esse, necessitatibus sit cum. Incidunt vero ratione quasi dignissimos consectetur consequatur, tempora voluptatibus.",
					imgUrl: "https://i.picsum.photos/id/1002/1920/1080.jpg?hmac=1wSpvZ_v0QK6GFg7Uce0QsUAyRHP0521DjMdvw4Bwsk",
					showFullCard: false
				},
				{
					title: "Test Title LOREM Ipsum",
					shortDescription: 'Test test test test',
					fullDescription:
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores iste enim, quidem perferendis voluptas rem a blanditiis esse, necessitatibus sit cum. Incidunt vero ratione quasi dignissimos consectetur consequatur, tempora voluptatibus.",
					imgUrl: "https://i.picsum.photos/id/1/1920/1080.jpg?hmac=F3y4Fj0qI8heo51givSFTbNc8P5g1eR8ztnE7zDiVDg",
					showFullCard: false
				},
				{
					title: "Top Test Place to visit",
					shortDescription: 'Dunno what to write here .. ',
					fullDescription:
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores iste enim, quidem perferendis voluptas rem a blanditiis esse, necessitatibus sit cum. Incidunt vero ratione quasi dignissimos consectetur consequatur, tempora voluptatibus.",
					imgUrl: "https://i.picsum.photos/id/43/1920/1080.jpg?hmac=POIDrb96WzZT5Tag0vJxqI1z5SDR9R56VViVZi63kvE",
					showFullCard: false
				},
			],
		};
	},
	computed: {
		...mapGetters("modules/news", {
			news: "getNews",
		}),
	}
};
</script>
<style scoped>
.moving-news-background {
	/* background-color: #C7C1A7; */
	overflow: hidden;
}
.moving-news {
	position: relative;
	transition: all 5s;
	animation: move 30s linear infinite;
	display: inline;
	white-space: nowrap;
}
@keyframes move {
	0% {
		left: 100%;
	}
	100% {
		left: -100%;
	}
}
</style>