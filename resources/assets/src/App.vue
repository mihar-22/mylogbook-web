
<script>
	import Bootstrap from './bootstrap';

	// Plugins
  import VueResource from 'vue-resource';
  import VueMaterial from 'vue-material';

	Vue.use(VueResource);

	Vue.use(VueMaterial.MdCore);
	Vue.use(VueMaterial.MdButton);
  Vue.use(VueMaterial.MdLayout);
  Vue.use(VueMaterial.MdInputContainer);
  Vue.use(VueMaterial.MdBackdrop);
  Vue.use(VueMaterial.MdDialog);
  Vue.use(VueMaterial.MdProgress);
  Vue.use(VueMaterial.MdMenu);
  Vue.use(VueMaterial.MdList);
  Vue.use(VueMaterial.MdSelect);

	// Config
  const csrfToken = document.querySelector('meta[name="csrf-token"]')
                            .getAttribute('content');

	Vue.config.silent = env.vue.silent;

	Vue.http.options.root = env.mylb.api_url;

  Vue.http.headers.common['X-CSRF-TOKEN'] = csrfToken;
  Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	Vue.material.registerTheme('default', {
		primary: {
			color: 'grey',
			hue: 800
		},
		accent: 'green',
		warn: 'red',
		background: 'white'
	});

  // Views
  import PasswordResetView from './views/PasswordReset.vue';
  import ContactUsView     from './views/ContactUs.vue';
  import LandingPageView   from './views/LandingPage.vue';

  Vue.component('PasswordResetView', PasswordResetView);
  Vue.component('ContactUsView', ContactUsView);
  Vue.component('LandingPageView', LandingPageView);

	// Create app instance
	new Vue({
		el: '#app'
	});
</script>

<style lang="scss">
	// Vue Material Core
	@import "../../../node_modules/vue-material/src/core/stylesheets/variables";
  @import "../../../node_modules/vue-material/src/core/stylesheets/mixins";
  @import "../../../node_modules/vue-material/src/core/stylesheets/base";
  @import "../../../node_modules/vue-material/src/core/stylesheets/scrollbar";
  @import "../../../node_modules/vue-material/src/core/stylesheets/typography";
  @import "../../../node_modules/vue-material/src/core/components/mdInkRipple/mdInkRipple";

  // Vue Material Components
	@import "../../../node_modules/vue-material/dist/components/mdButton/index.css";
  @import "../../../node_modules/vue-material/dist/components/mdLayout/index.css";
  @import "../../../node_modules/vue-material/dist/components/mdInputContainer/index.css";
  @import "../../../node_modules/vue-material/dist/components/mdBackdrop/index.css";
  @import "../../../node_modules/vue-material/dist/components/mdDialog/index.css";
  @import "../../../node_modules/vue-material/dist/components/mdProgress/index.css";
  @import "../../../node_modules/vue-material/dist/components/mdMenu/index.css";
  @import "../../../node_modules/vue-material/dist/components/mdList/index.css";
  @import "../../../node_modules/vue-material/dist/components/mdSelect/index.css";

  // Core
  @import "core/global";
  @import "core/util";

  // Views
  @import "views/master";
  @import "views/legal";
</style>
