
<script>
	import Bootstrap 		from './bootstrap';
	import VueResource 	from 'vue-resource';
	import VueMaterial	from 'vue-material';

	// Plugins
	Vue.use(VueResource);

	Vue.use(VueMaterial.MdCore);
	Vue.use(VueMaterial.MdButton);

	// Config
	Vue.config.silent = env.vue.silent;

	Vue.http.options.root = env.mylb.api_url;

	Vue.material.registerTheme('default', {
		primary: {
			color: 'grey',
			hue: 800
		},
		accent: 'pink',
		warn: 'red',
		background: {
			color: 'grey',
			hue: 100
		}
	});

	// Create app instance
	new Vue({
		el: '#app'
	});
</script>

<style lang="scss">
	// Vue Material
	@import "../../../node_modules/vue-material/dist/components/mdCore/index.css";
	@import "../../../node_modules/vue-material/dist/components/mdButton/index.css";	
</style>
