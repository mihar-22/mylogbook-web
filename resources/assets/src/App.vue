
<script>
	import Bootstrap from './bootstrap';

	// Config
	Vue.config.silent = env.vue.silent;

	// Vue Resource
	import VueResource from 'vue-resource';

	vue.use(VueResource);

	Vue.http.options.root = env.API_ROOT;
	Vue.http.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
	Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	// Create app instance
	const app = new Vue({
		name: 'app'
	});
</script>