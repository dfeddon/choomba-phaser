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
				
				<b-col align-self="center">

					<figure class="image is-64x64">
						<b-img :src="tweet.img" alt="Image"></b-img>
						<figcaption class="figure-caption text-center">4 / 20</figcaption>
					</figure>

				</b-col>
				
				<b-col align-self="center" cols="4" class="text-left">

					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1" style="color:#fff">{{tweet.name}}</h5>
						<!-- <small style="color:#333">3 days ago</small> -->
					</div>
					
					<span v-if="tweet.type===1" style="color:orange">STORAGE:</span>
					<span v-if="tweet.type===2" style="color:orange">STOCK:</span>
					<!-- <span style="color:lime">{{tweet.tweet}}</span> -->
					<span>
						<ul id="example-1">
							<li v-for="item in tweet.data" :key="item.id">
								<small class="mb-1" style="color:#fff">{{ item.name }}</small>
							</li>
						</ul>
					</span>
					<div v-if="tweet.type===2" style="color:orange">
						<div style="color=orange">READY FOR PRODUCTION:</div>
						<small class="mb-1 ml-4" style="color:#fff">N/A</small>
					</div>
					
				</b-col>

				<b-col align-self="center" cols="2" class="text-center">

					<b-row class="mb-3">
						<b-button variant="primary" block>VISIT</b-button>
					</b-row>
					<b-row v-if="tweet.type===2">
						<b-button variant="success" block>START PRODUCTION</b-button>
					</b-row>
				
				</b-col>
				
				<b-col align-self="center">

					<figure class="image is-64x64">
						<b-img thumbnail rounded :src="tweet.manager" alt="Image"></b-img>
						<figcaption class="figure-caption text-center">Cipher</figcaption>
					</figure>

				</b-col>

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