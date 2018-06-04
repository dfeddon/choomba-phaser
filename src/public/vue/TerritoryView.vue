<template id="tweet-component">

	<div class="tweet">
		<div class="box">

			<article class="media">

			<div class="media-left">
				<figure class="image is-64x64">
				<img :src="tweet.img" alt="Image">
				</figure>
			</div>

			<div class="media-content">
				<div class="content">
				<p>
					<strong>{{tweet.name}}</strong> <small>{{tweet.handle}}</small>
					<br>
					{{tweet.tweet}}
				</p>
				</div>
				<div class="level-left">
					<a class="level-item">
					<span class="icon is-small"><i class="fas fa-heart"></i></span>
					<span class="likes">{{tweet.likes}}</span>
					</a>
				</div>
			</div>

			</article>
			
		</div>
	</div>
</template>

<script lang="ts">
	export default {
		name: 'tweet-component',
		props: {
			tweet: {}
		},
		// data() {
		// 	return {}
		// },
		methods: {
			show: function(event: any) {
				// targetId: any = event.currentTarget.id;
				alert('click')
			}
		},
		mounted() {
			console.log("TerritoryView.vue mounted");
			console.log(this.tweet);
		}
	}
</script>