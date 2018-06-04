import { Globals } from "../services/Globals";
// import { LobbyDropper } from "../controllers/LobbyDropper";
// import { CharacterVO } from "../models/CharactersVO";
import { FlexGrid } from "phaser-ce";
import Vue from "vue";
import TerritoryVue from "../public/vue/TerritoryView.vue";
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

class TerritoryContentController {
	// item: HTMLImageElement;
	// name: HTMLElement;
	// slot: number = 1;
	data: {};
	vueModal: Vue;

	// __this = this;

	clickHandler(e: any): void {
		// this => element clicked
		console.log('== TerritoryContentController ==', e);
		switch (e.target.className) {
			case 'pool-item-img':
			case 'crew-portraits':
				// Globals.getInstance().territoryController.territoryInfoModal(e);
				break;
		}
	}

	createView(doc: any) {
		// let list: HTMLList;
		// let item: HTMLImageElement;
		// let view: any = doc.querySelector('#section-territory');
		// view.style.display="block";
		// console.log("* list", list);
		/*let v = new Vue({
			el: "#section-territory",
	// 		template: `
    // <div>
    //     <div>Hello {{name}}!</div>
    //     Name: <input v-model="name" type="text">
    // </div>`,
			data: {
				message: "Hello World"
			}
		});//*/
		/*
		let tweets = this.getRandomTweet();
		console.log('* data', tweets);
		new Vue({
			el: '#app',
			data: {
				tweets
			}
		});*/
		let tweets = this.getRandomTweet();
		console.log("* tweets", tweets);

		Vue.use(BootstrapVue);

		// register modal component
		Vue.component('modal', {
			template: '#modal-template',
			props: {
				tweet: Object
			},
		});

		Vue.component("tweet-component", TerritoryVue);

		/*
		Vue.component("tweet-component", {
			// render: h => h(TerritoryVue, { props: Object }),
			props: {
				tweet: Object
			},
			// data: () => { return {tweet: tweets} }
		});//*/

		/*
		Vue.component('tweet-component', {
			template: `
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
			`,
			props: {
				tweet: Object
			}
		});//*/

		// start app
		if (!this.vueModal) {
			this.vueModal = new Vue({
				el: '#section-territory',
				data: {
					showModal: true,
					tweets: tweets
				},
				// template: 'tweet-component'
			});
		} else {
			this.vueModal.$data.showModal = true;
			this.vueModal.$data.tweets = tweets;
		}

		return this;
	}

	getRandomTweet = (): any => {
		return [{
			id: 1,
			name: 'James',
			handle: '@jokerjames',
			img: 'https://s3.amazonaws.com/com.dfeddon.choomba/client/images/territory/factory.png',
			tweet: "If you don't succeed, dust yourself off and try again.",
			likes: 10,
		},
		{
			id: 2,
			name: 'Fatima',
			handle: '@fantasticfatima',
			img: 'https://s3.amazonaws.com/com.dfeddon.choomba/client/images/territory/factory.png',
			tweet: 'Better late than never but never late is better.',
			likes: 12,
		},
		{
			id: 3,
			name: 'Xin',
			handle: '@xeroxin',
			img: 'https://s3.amazonaws.com/com.dfeddon.choomba/client/images/territory/factory.png',
			tweet: 'Beauty in the struggle, ugliness in the success.',
			likes: 18,
		}	
	]};
}

export { TerritoryContentController }