import { createApp } from 'vue'
import App from './App.vue'
import routes from './Routes'
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import VueSweetalert2 from "vue-sweetalert2";
library.add(fas);
const app = createApp(App);
app.use(VueSweetalert2);
app.use(routes);
app.use(bootstrap);
app.component('font-awesome-icon', FontAwesomeIcon).mount("#app");
