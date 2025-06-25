/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */




// Composables
import { createApp } from "vue";
import { createPinia } from "pinia";

// Styles
import "unfonts.css";
import "vuetify/styles";    // makes sure Vuetify’s CSS variables exist
import "@/styles/override-font.css"; // <— your override comes last

// Plugins
import { registerPlugins } from "@/plugins";
// Components
import App from "./App.vue";
import vuetify from './plugins/vuetify'

const app = createApp(App);

app.use(vuetify);
registerPlugins(app);
const pinia = createPinia();
app.use(pinia);

app.mount("#app");
