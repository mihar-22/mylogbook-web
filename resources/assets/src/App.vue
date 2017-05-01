
<template>
	<main id="app">
		<slot></slot>
	</main>
</template>

<script>
	import Bootstrap 		from './bootstrap';
	import VueResource 	from 'vue-resource';

	// Plugins
	Vue.use(VueResource);

	// Config
	Vue.config.silent = env.vue.silent;

	Vue.http.options.root = env.mylb.api_url;

	// Create app instance
	new Vue({
		el: '#app'
	});
</script>

<style lang="scss">
	// Views
	@import "views/master";
</style>