import Bootstrap from './bootstrap';

// Plugins
import VueRouter   from 'vue-router';
import VueResource from 'vue-resource';
import VueMaterial from 'vue-material';
import VeeValidate from 'vee-validate';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VeeValidate);
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
Vue.config.silent = env.vue.silent;

Vue.http.options.root = env.mylb.api_url;

Vue.http.headers.common['X-CSRF-TOKEN'] = Laravel.csrfToken;
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

// Layouts
import MasterLayout from './views/Master.vue';

// Templates
import ContentTemplate     from './views/templates/Content.vue';
import CenterPieceTemplate from './views/templates/CenterPiece.vue';

Vue.component('MasterLayout', MasterLayout);
Vue.component('ContentTemplate', ContentTemplate);
Vue.component('CenterPieceTemplate', CenterPieceTemplate);

// Pages
import LandingPage       from './views/pages/Landing.vue';
import PrivacyPage       from './views/pages/legal/Privacy.vue';
import TermsPage         from './views/pages/legal/Terms.vue';
import ContactUsPage     from './views/pages/ContactUs.vue';
import PasswordResetPage from './views/pages/auth/PasswordReset.vue';
import VerifyEmailPage   from './views/pages/auth/VerifyEmail.vue';

// Errors
import PageNotFound from './views/errors/404.vue';

// Router
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: LandingPage },
    { path: '/legal/privacy-policy', component: PrivacyPage },
    { path: '/legal/terms-of-service', component: TermsPage },
    { path: '/contact-us', component: ContactUsPage },
    { path: '/email/verify/:email/:token', component: VerifyEmailPage },
    { path: '/password/reset/:email/:token', component: PasswordResetPage },
    { path: '*', component: PageNotFound }
  ]
});

// Create app instance
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App),

  router
});
