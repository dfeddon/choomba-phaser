<template id="tweet-component">

	<div class="tweet">

		<!-- <b-container fluid>
			<b-row class="text-center">
			<b-col md="3" class="py-3">
				<b-btn v-b-popover.hover.top="'Popover!'" variant="primary">Top</b-btn>
			</b-col>
			<b-col md="3" class="py-3">
				<b-btn v-b-popover.hover.right="'Popover!'" variant="primary">Right</b-btn>
			</b-col>
			<b-col md="3" class="py-3">
				<b-btn v-b-popover.hover.left="'Popover!'" variant="primary">Left</b-btn>
			</b-col>
			<b-col md="3" class="py-3">
				<b-btn v-b-popover.hover.bottom="'ToolTip!'" variant="primary">Bottom</b-btn>
			</b-col>
			</b-row>
		</b-container> -->

		<div class="box">

		<b-row class="text-center">
			<b-col>1 of 3</b-col>
			<b-col cols="8"> <b-button variant="success">Not Disabled</b-button></b-col>
			<b-col>3 of 3</b-col>
		</b-row>
			<!-- <div class="media-left">
				<figure class="image is-64x64">
					<b-img :src="tweet.img" alt="Image"></b-img>
				</figure>
			</div>

			<div class="media-content">
					<b-img :src="tweet.img" alt="Image"></b-img>
					<span>Tweet:{{tweet.tweet}}</span>
					<b-img :src="tweet.img" alt="Image"></b-img>
			</div>

			<div class="level-left">
				<figure class="image is-64x64">
					<b-img :src="tweet.img" alt="Image"></b-img>
				</figure>
			</div> -->

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