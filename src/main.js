import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


// Import BootstrapVue 3
import BootstrapVue3 from 'bootstrap-vue-3';

const app = createApp(App);

// Make BootstrapVue available throughout your project
app.use(router);
app.use(BootstrapVue3);

app.mount('#app');
