import Vue from 'vue';
import App from './App.vue';

import './plugins/composition-api';
import './plugins/bootstrap-vue';
import './plugins/markdown';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
